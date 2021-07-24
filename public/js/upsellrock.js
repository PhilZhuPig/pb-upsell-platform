console.log('%c 🐜 ant upsell rock is ready! ', 'background: #222; color: #bada55');
// fetch the cart
fetch('/cart.js').then(res => { return res.json(); }).then(json => { cartInfo = json; console.log(json); });
// add iframe
var iframe = document.createElement('iframe');
setTimeout(() => {
    var contentDocument = iframe.contentDocument;
    var head = contentDocument.head;
    iframe.id = "ant-upsell-rock-iframe"
    iframe.style = "position:fixed;left:0px;top:0px;bottom:0px;right:0px;;width:100%;height:100%;z-index:999999999;display:none"
    var tailwindcss = document.createElement('link');
    tailwindcss.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
    tailwindcss.rel = "stylesheet"
    tailwindcss.type = "text/css";
    head.append(tailwindcss);

    // custom css & custom js
    var customStyle = document.createElement('style');
    customStyle.type = "text/css";
    customStyle.textContent = "select:disabled{color:#888;background:#fefefe;}" + upsellRockSetting.custom_css;
    head.appendChild(customStyle);
    var customScript = document.createElement('script');
    customScript.textContent = upsellRockSetting.custom_js;
    contentDocument.body.appendChild(customScript);
}, 500);
document.body.appendChild(iframe);

var paths = window.location.pathname.split("/");
var is_product = paths[1] === 'products';
console.log("is_product:" + is_product);

// max popup session views
var sessionViews = window.localStorage.getItem('sessionViews');
if (!sessionViews && upsellRockSetting.max_popup_session_views > 0) {
    window.localStorage.setItem('sessionViews', 0);
} else if (upsellRockSetting.max_popup_session_views == 0) {
    window.localStorage.removeItem('sessionViews');
}

var g_variant = 0;
updateGVariant();

var interval = setInterval(() => {
    var search = window.location.search;
    if (search) {
        search = search.replace("?", "");
        var kvs = search.split('&');
        kvs.forEach(kv => {
            if (kv.includes('variant=')) {
                var new_variant = kv.split('=')[1];
                if (new_variant != g_variant) {
                    g_variant = new_variant;
                    // reload upsells
                    if (Object.keys(currentProduct).length > 0 && g_variant > 0) {
                        getUpsellRocks(currentProduct.id, g_variant).then(res => {
                            refetchUpsellProduct();
                        });
                    }
                }
            }
        })
    }
    console.log('g_variant=' + g_variant);
}, 1000);

if (!is_product) {
    clearInterval(interval);
}

var antiCurrencyWidget = window.localStorage.getItem('antiCurrencyWidget');

function updateGVariant() {
    var search = window.location.search;
    if (search) {
        search = search.replace("?", "");
        var kvs = search.split('&');
        kvs.forEach(kv => {
            if (kv.includes('variant=')) {
                var new_variant = kv.split('=')[1];
                if (new_variant != g_variant) {
                    g_variant = new_variant;
                }
            }
        })
    }
}

function getCurrencySymbol(currency) {
    var hitCurrency = currencies.find(c => c.currency === currency);
    if (hitCurrency) {
        return hitCurrency.currency_symbol
    }
}

var currentProduct = {};
async function getShopifyProduct() {
    var res = await fetch('/products/' + paths[2] + '.js');
    var json = await res.json();
    currentProduct = json;
    if (g_variant == 0) {
        g_variant = json.variants[0].id;
    }
    return json;
}

async function getUpsellRocks(product, variant) {
    var res = await fetch(upsellRockBaseUrl + "/upsells?shop=" + upsellRockShopDomain + "&product=" + product + "&variant=" + variant)
    var json = await res.json();
    upsells = json.data;
    return json.data;
}

async function getUpsellProduct(handle) {
    var res = await fetch('/products/' + handle + ".js");
    var json = await res.json();
    upsellProducts.push(json);
    return json;
}

function trackView() {
    fetch(upsellRockBaseUrl + '/track', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'shop': upsellRockShopDomain,
            'cart_token': cartInfo.token,
            'event_type': 'view',
            'upsell_rocks': upsells.map(upsell => upsell.id),
            'data': {},
            'stats_at': new Date().getTime()
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log(json);
    })
}

function trackAddToCart(upsell_id, variant_id, parent_product, quantity) {
    fetch(upsellRockBaseUrl + '/track', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'shop': upsellRockShopDomain,
            'cart_token': cartInfo.token,
            'event_type': 'add_to_cart',
            'upsell_rocks': upsell_id,
            'data': {
                'variant_id': variant_id,
                'quantity': quantity,
                'parent_product': parent_product
            },
            'stats_at': new Date().getTime()
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log(json);
    })
}

function trackRemoveFromCart(upsell_id) {
    fetch(upsellRockBaseUrl + '/track', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'shop': upsellRockShopDomain,
            'cart_token': cartInfo.token,
            'event_type': 'remove_from_cart',
            'upsell_rocks': upsell_id,
            'data': {},
            'stats_at': new Date().getTime()
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log(json);
    })
}

var upsells = [];
var upsellProducts = [];
if (is_product) {
    refetchUpsellProduct();
}

async function getShopfiyRecommendedProducts(upsell) {
    var res = await fetch('/recommendations/products.json?product_id=' + currentProduct.id + '&limit=' + upsell.recommended_product_count);
    var json = await res.json();
    console.log('recommended products');
    console.log(JSON.stringify(json));
    return json.products;
}

function refetchUpsellProduct() {
    var smartAutoUpsells = [];
    getShopifyProduct().then(product => {
        getUpsellRocks(product.id, g_variant == 0 ? product.variants[0].id : g_variant).then(upsells => {
            console.log(upsells);
            upsells.forEach(upsell => {
                // add product object to upsell
                if (upsell.type == 'product') {
                    getUpsellProduct(upsell.handle).then(p => {
                        var variants = [];
                        if (upsell.variants) {
                            upsell.variants.forEach(v => {
                                p.variants.forEach(pv => {
                                    if (v === pv.id) {
                                        variants.push(pv);
                                    }
                                })
                            })
                        }
                        if (upsell.variant > 0) {
                            p.variants.forEach(pv => {
                                if (upsell.variant === pv.id) {
                                    variants.push(pv);
                                }
                            })
                        }
                        p.variants = variants;
                        upsell['shopify_product'] = p;
                        console.log(upsell);
                    });
                } else if (upsell.type == 'smart-auto') { // add recommended products to upsell
                    getShopfiyRecommendedProducts(upsell).then(ps => {
                        if (ps.length > 0) {
                            // insert shopify_product, variant, variants to upsell
                            ps.forEach(p => {
                                var newUpsell = Object.clone(upsell);
                                newUpsell['shopify_product'] = p;
                                if (p.variants.length > 1) {
                                    newUpsell['variants'] = p.variants.map(v => v.id);
                                    newUpsell['variant'] = 0;
                                } else if (p.variants.length == 1) {
                                    newUpsell['variant'] = p.variants[0].id;
                                    newUpsell['variants'] = [];
                                }
                                // 扩展upsells
                                smartAutoUpsells.push(newUpsell);
                            })
                        }
                    })
                } else if (upsell.type == 'custom-service') {
                    getUpsellProduct(upsell.handle).then(p => {
                        var variants = [];
                        if (upsell.variant > 0) {
                            p.variants.forEach(pv => {
                                if (upsell.variant === pv.id) {
                                    variants.push(pv);
                                }
                            })
                        }
                        p.variants = variants;
                        upsell['shopify_product'] = p;
                        console.log(upsell);
                    });
                }
            });
            if (smartAutoUpsells.length > 0) {
                upsells = upsells.concat(smartAutoUpsells);
                console.log('upsells length = ' + upsells.length);
            }
            var formBtn = document.querySelector("form[action^='/cart/add'] button[type='submit']");
            formBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('inject');
                // show upsell popup
                buildPopupWithHtml();
            });
        });
    });
}

function cancel() {
    var upsellWithDiscount = upsells.find(up => up.apply_discount && up.discount_code.length > 0);
    // default
    var close_action = upsellRockSetting.close_action;
    if (close_action == "") {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
        });
    } else if (close_action == 'redirect_to_cart') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
            if (upsellWithDiscount) {
                window.location.href = "/cart?discount=" + upsellWithDiscount.discount_code;
            } else {
                window.location.href = "/cart";
            }
        });
    } else if (close_action == 'redirect_to_checkout') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
            if (upsellWithDiscount) {
                window.location.href = "/checkout?discount=" + upsellWithDiscount.discount_code;
            } else {
                window.location.href = "/checkout";
            }
        });
    } else if (close_action == 'close') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
        });
    }
}

function proceed() {
    var upsellWithDiscount = upsells.find(up => up.apply_discount && up.discount_code.length > 0);
    // default
    var continue_action = upsellRockSetting.continue_action;
    if (continue_action == "") {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
        });
    } else if (continue_action == 'redirect_to_cart') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
            if (upsellWithDiscount) {
                window.location.href = "/cart?discount=" + upsellWithDiscount.discount_code;
            } else {
                window.location.href = "/cart";
            }
        });
    } else if (continue_action == 'redirect_to_checkout') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
            if (upsellWithDiscount) {
                window.location.href = "/checkout?discount=" + upsellWithDiscount.discount_code;
            } else {
                window.location.href = "/checkout";
            }
        });
    } else if (continue_action == 'close') {
        addVariantToCart(g_variant).then(res => {
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            iframe.style.display = "none";
        });
    }
}

function addClick(product, variant) {
    console.log('product=' + product + " variant=" + variant);
    // find the upsell
    var upsell = upsells.find(up => up.product == product)
    console.log(upsell);
    // add variant to cart
    addVariantToCart(variant, 1).then(res => {
        updateUpsellRockAttribute().then(response => {
            // use discount code
            if (upsell.apply_discount) {
                useDiscountCode(upsell.discount_code);
            }
            // track add to cart
            trackAddToCart(upsell.id, variant, { id: currentProduct.id, handle: currentProduct.handle }, 1);
            // modify the style
            var iframe = document.getElementById('ant-upsell-rock-iframe');
            var contentDocument = iframe.contentDocument;
            var add = contentDocument.getElementById('add-' + product);
            // remove all listeners
            var new_element = add.cloneNode(true);
            add.parentNode.replaceChild(new_element, add);
            var add = contentDocument.getElementById('add-' + product);
            add.innerHTML = upsellRockSetting.added_to_cart;
            add.style.backgroundColor = '#888888';
            // show the x btn for removing variant just added
            var remove = contentDocument.getElementById('remove-' + product);
            remove.classList.remove('hidden');
            // disable select
            var select = contentDocument.getElementById('select-' + product);
            if (select) {
                select.disabled = true;
            }
            // add animation to image product
            var image = contentDocument.getElementById('image-' + product);
            var aminationHtml = '<span id="animation-' + product + '" class="flex h-3 w-3 absolute" style="top:-5px;right:-5px;">\
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" ></span>\
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500">\
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>\
                                    </span>\
                                </span>\
                                ';
            image.innerHTML += aminationHtml;
        })
    });
}

function removeClick(product, variant) {
    console.log('addRemove product=' + product + ' variant=' + variant);
    // find the upsell
    var upsell = upsells.find(up => up.product == product);
    removeVariantFromCart(variant).then(res => {
        trackRemoveFromCart(upsell.id);
        // modify the style
        var iframe = document.getElementById('ant-upsell-rock-iframe');
        var contentDocument = iframe.contentDocument;
        var add = contentDocument.getElementById('add-' + product);
        add.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>'
            + upsellRockSetting.add_to_cart;
        add.style.backgroundColor = upsellRockSetting.primary_color;
        // add event listener
        add.addEventListener('click', function () {
            addClick(product, variant);
        });
        // hide the x btn
        var remove = contentDocument.getElementById('remove-' + product);
        remove.classList.add('hidden');
        // enable select
        var select = contentDocument.getElementById('select-' + product);
        if (select) {
            select.disabled = false;
        }
        // remove animation
        var animation = contentDocument.getElementById('animation-' + product);
        animation.parentNode.removeChild(animation);
    })
}

async function addVariantToCart(variant, quantity) {
    var res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quantity: quantity,
            id: variant,
        })
    });
    var json = await res.json();
    return json;
}

async function removeVariantFromCart(variant, quantity = 0) {
    var res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quantity: quantity,
            id: variant + '',
        })
    });
    var json = await res.json();
    return json;
}

async function updateUpsellRockAttribute() {
    var res = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            attributes: {
                antupsellrock_token: cartInfo.token
            }
        })
    });
    var json = await res.json();
    return json;
}

async function useDiscountCode(code) {
    var res = await fetch('/discount/' + code);
    var json = await res.json();
    return json;
}


function buildSelectVariantsHtml(upsell) {
    var html = '';
    upsell.variants.forEach(vId => {
        html += '\
            <option value="'+ vId + '">' + upsell.shopify_product.variants.find(v => v.id == vId).title + '</option>\
        '
    })
    return html;
}

function buildNormalPrice(upsell) {
    var price = 0;
    if (upsell.variant && upsell.variant > 0) { // only one variant
        price = Number(upsell.shopify_product.price / 100).toFixed(2)
    } else {
        var v0 = upsell.variants[0];
        var variant0 = upsell.shopify_product.variants.find(v => v.id == v0);
        price = Number(variant0.price / 100).toFixed(2)
    }
    var html = '';
    html += '<div class="text-gray-800 text-sm font-light flex">\
                '+ getCurrencySymbol(shopCurrency) + price + '\
            </div>\
            '
    return html;
}

function buildDiscountPrice(upsell) {
    var html = '';
    var price = 0;
    var discountPrice = 0;
    var variant0 = {};
    if (upsell.variant && upsell.variant > 0) { // only one variant
        price = Number(upsell.shopify_product.price / 100).toFixed(2)
    } else {
        var v0 = upsell.variants[0];
        variant0 = upsell.shopify_product.variants.find(v => v.id == v0);
        price = Number(variant0.price / 100).toFixed(2)
    }
    if (upsell.amount_type === 'percentage') {
        if (upsell.variant && upsell.variant > 0) {
            discountPrice = Number(upsell.shopify_product.price * (100 - upsell.amount) / 10000).toFixed(2);
        } else {
            discountPrice = Number(variant0.price * (100 - upsell.amount) / 10000).toFixed(2);
        }
    } else {
        if (upsell.variant && upsell.variant > 0) {
            discountPrice = Number(upsell.shopify_product.price * (100 - upsell.amount) / 10000).toFixed(2);
        } else {
            discountPrice = Number(variant0.price / 100 - upsell.amount).toFixed(2);
        }
    }
    html += '<div class="text-gray-800 text-sm font-light flex">\
                <div id="normal-price-'+ upsell.product + '" class="text-gray-500 line-through">' + getCurrencySymbol(shopCurrency) + price + '</div>\
                <div id="discount-price-'+ upsell.product + '" class="ml-1">' + getCurrencySymbol(shopCurrency) + discountPrice + '</div>\
            </div>\
            '
    return html;
}

function buildPopupWithHtml() {
    // check max popup session views
    var sessionViews = parseInt(window.localStorage.getItem('sessionViews'));
    if (sessionViews && upsellRockSetting.max_popup_session_views > 0 && sessionViews >= upsellRockSetting.max_popup_session_views) {
        // remove click event listener
        var formBtn = document.querySelector("form[action^='/cart/add'] button[type='submit']");
        var newFormBtn = formBtn.cloneNode(true);
        formBtn.parentNode.replaceChild(newFormBtn, formBtn);
        var formBtn = document.querySelector("form[action^='/cart/add'] button[type='submit']");
        formBtn.click();
        return;
    }
    window.localStorage.setItem('sessionViews', sessionViews + 1);
    trackView();
    var iframe = document.getElementById('ant-upsell-rock-iframe');
    iframe.style.display = "";
    var contentDocument = iframe.contentDocument;
    var body = contentDocument.body;
    var upsellProductsHtml = '';
    upsells.forEach((upsell, index) => {
        if (upsell.shopify_product) {
            upsellProductsHtml += '\
            <div class="ml-9 border-l border-gray-300 flex relative px-4 '+ (index === (upsells.length - 1) ? 'pb-6 ' : 'pb-4 ') + (index === 0 ? 'pt-6' : 'pt-4') + '">\
                <div class="absolute rounded-xl border-b border-gray-300" style="left:-1px;top:-20px;height:60px;width:40px;"></div>\
                <div id="image-'+ upsell.product + '" class="relative" style="width:64px;height:64px;z-index:10">\
                    <img class="bg-white" style="width:64px;height:64px;" src="'+ upsell.shopify_product.featured_image + '"/>\
                </div>\
                <div class="ml-2 flex-1 flex flex-col justify-between">\
                    <div class="text-gray-800">'+ (upsell.type === 'custom-service' ? upsell.headline : upsell.shopify_product.title) + '</div>\
                    '+ (upsell.apply_discount ? buildDiscountPrice(upsell) : buildNormalPrice(upsell)) + '\
                    '+ (upsell.short_description.length > 0 ? '<div class="text-gray-500 text-sm font-light">' + upsell.short_description + '</div>' : '') + '\
                    '+ ((upsell.variants && upsell.variants.length > 0) ? '<div class="w-auto">\
                        <select id="select-'+ upsell.product + '" data-product="' + upsell.product + '" value="' + upsell.variants[0] + '" class="mt-1 block w-auto py-2 px-3 border border-gray-300 bg-white focus:outline-none focus:ring-gray-700 focus:border-gray-700 sm:text-sm"">\
                            '+ buildSelectVariantsHtml(upsell) + '\
                        </select>\
                    </div>' : '') + '\
                </div>\
                <div class="flex items-center">\
                    <div id="add-'+ upsell.product + '" data-product="' + upsell.product + '" data-variant="' + (upsell.variant > 0 ? upsell.variant : upsell.variants[0]) + '" class="flex items-center w-auto px-4 py-2 text-white text-sm font-medium rounded-sm cursor-pointer" style="background-color:' + upsellRockSetting.primary_color + '"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>' + upsellRockSetting.add_to_cart + '</div>\
                    <div id="remove-'+ upsell.product + '" class="ml-2 cursor-pointer hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>\
                </div>\
            </div>\
        ';
        }
    });
    var html = '\
        <div div class="fixed z-10 inset-0 overflow-y-auto" aria - labelledby="modal-title" role = "dialog" aria - modal="true" >\
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">\
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>\
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>\
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">\
                    <div class="bg-white px-4 pt-5">\
                        <div class="sm:flex sm:items-start">\
                            <div class="flex flex-col mt-0 w-full">\
                                <div class="flex items-center">\
                                    <h3 class="flex-1 text-center text-lg leading-6 font-light text-gray-900" id="modal-title">\
                                        '+ upsellRockSetting.title + '\
                                    </h3 >\
                                    <div class="ml-3 cursor-pointer" id="icon-close">\
                                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>\
                                    </div>\
                                </div>\
                                <div class="mt-4 flex flex-col">\
                                    <div class="flex justify-start bg-gray-100 rounded p-2">\
                                        <div class="relative">\
                                            <img id="product-image" src="'+ currentProduct.featured_image + '" class="object-cover" style="width:64px;height:64px;">\
                                            <span class="flex h-3 w-3 absolute" style="top:-5px;right:-5px;">\
                                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" ></span>\
                                                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500">\
                                                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>\
                                                </span>\
                                            </span>\
                                        </div>\
                                        <div class="ml-3 flex flex-col justify-between py-1">\
                                            <div class="text-gray-800">'+ currentProduct.title + '</div>\
                                            <div class="text-sm font-light text-gray-800"><span class="money anti-money">'+ getCurrencySymbol(shopCurrency) + Number(currentProduct.price / 100).toFixed(2) + '</span></div>\
                                        </div>\
                                    </div>\
                                    '+ upsellProductsHtml + '\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="bg-gray-50 px-4 py-3 border-t border-gray-300 sm:px-6 sm:flex sm:flex-row-reverse">\
                        <button type="button" id="proceed-to-cart" class="w-full inline-flex justify-center items-center rounded-sm border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" style="background-color:'+ upsellRockSetting.primary_color + '">\
                            '+ upsellRockSetting.proceed_to_cart + '\
                            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>\
                        </button>\
                    </div>\
                </div>\
            </div>\
        </div>\
        '
    body.innerHTML = html;
    var iconClose = contentDocument.getElementById('icon-close');
    iconClose.addEventListener('click', cancel);
    var proceedToCart = contentDocument.getElementById('proceed-to-cart');
    proceedToCart.addEventListener('click', function () {
        proceed();
    });

    // add-product-variant
    upsells.forEach(upsell => {
        if (upsell.variant > 0) {
            var add = contentDocument.getElementById('add-' + upsell.product);
            add.addEventListener('click', function () {
                addClick(upsell.product, upsell.variant);
            })
            var remove = contentDocument.getElementById('remove-' + upsell.product);
            remove.addEventListener('click', function () {
                removeClick(upsell.product, upsell.variant);
            });
        } else if (upsell.variants && upsell.variants.length > 0) {
            var select = contentDocument.getElementById('select-' + upsell.product);
            var add = contentDocument.getElementById('add-' + upsell.product);
            add.addEventListener('click', function () {
                addClick(upsell.product, upsell.variants[0]);
            });
            var remove = contentDocument.getElementById('remove-' + upsell.product);
            remove.addEventListener('click', function () {
                removeClick(upsell.product, upsell.variants[0]);
            });
            select.addEventListener('change', function () {
                // rebind add event
                var add = contentDocument.getElementById('add-' + upsell.product);
                var new_element = add.cloneNode(true);
                add.parentNode.replaceChild(new_element, add);
                var add = contentDocument.getElementById('add-' + upsell.product);
                add.dataset.variant = select.value;
                add.addEventListener('click', function () {
                    addClick(upsell.product, select.value);
                });
                // rebind remove event
                var remove = contentDocument.getElementById('remove-' + upsell.product);
                var new_e = remove.cloneNode(true);
                remove.parentNode.replaceChild(new_e, remove);
                remove = contentDocument.getElementById('remove-' + upsell.product);
                remove.addEventListener('click', function () {
                    removeClick(upsell.product, select.value);
                });
                // 修改显示的价格
                var normalPriceElement = contentDocument.getElementById('normal-price-' + upsell.product);
                var discountPriceElement = contentDocument.getElementById('discount-price-' + upsell.product);
                var newVariant = upsell.shopify_product.variants.find(v => v.id == select.value);
                var newNormalPrice = newVariant.price;
                var newDiscountPrice = 0;
                if (upsell.amount_type === 'percentage') {
                    newDiscountPrice = Number(newNormalPrice * (100 - upsell.amount) / 10000).toFixed(2);
                } else {
                    newDiscountPrice = Number(newNormalPrice / 100 - upsell.amount).toFixed(2);
                }
                normalPriceElement.innerHTML = getCurrencySymbol(shopCurrency) + Number(newNormalPrice / 100).toFixed(2);
                discountPriceElement.innerHTML = getCurrencySymbol(shopCurrency) + newDiscountPrice;
            })
        }
    })

}

var cartInfo = {};
(function (ns, fetch) {
    if (typeof fetch !== 'function') return;

    ns.fetch = function () {
        const response = fetch.apply(this, arguments);

        response.then(res => {
            if ([
                `${window.location.origin}/cart.js`,
                `${window.location.origin}/cart/add.js`,
                `${window.location.origin}/cart/update.js`,
                `${window.location.origin}/cart/change.js`,
                `${window.location.origin}/cart/clear.js`,
                `${window.location.origin}/cart`,
                `${window.location.origin}/cart/add`,
                `${window.location.origin}/cart/update`,
                `${window.location.origin}/cart/change`,
                `${window.location.origin}/cart/clear`,
            ].includes(res.url)) {
                res.clone().json().then(data => {
                    console.log(JSON.stringify(data));
                });
            }
        });

        return response;
    }

}(window, window.fetch))
