let cartCount = 0;

const loadTrendingProducts = async () => {
    const container = document.getElementById('product-container');
    const spinner = document.getElementById('spinner');
    
    container.innerHTML = "";
    spinner.classList.remove('hidden');

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        
        spinner.classList.add('hidden');
        displayTrending(products.slice(0, 3)); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const displayTrending = (products) => {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList = "card bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden";
        card.innerHTML = `
            <figure class="img-wrapper">
                <img src="${product.image}" alt="${product.title}" />
            </figure>
            <div class="card-body p-5">
                <div class="flex justify-between items-center mb-2">
                    <span class="bg-blue-50 text-[#5B42F3] text-[9px] font-bold px-2 py-1 rounded uppercase">${product.category}</span>
                    <span class="text-[10px] text-gray-500 font-semibold"><i class="fa-solid fa-star text-orange-400"></i> ${product.rating.rate} (${product.rating.count})</span>
                </div>
                <h2 class="font-bold text-gray-800 text-sm h-10 overflow-hidden leading-tight mb-2">${product.title}</h2>
                <p class="text-xl font-black text-gray-900 mb-4">$${product.price}</p>
                <div class="flex gap-2">
                    <button onclick="loadDetails(${product.id})" class="btn btn-xs flex-1 bg-white border-gray-200 text-gray-600 hover:bg-gray-50">Details</button>
                    <button onclick="addToCart()" class="btn btn-xs flex-1 bg-[#5B42F3] text-white border-none hover:bg-[#4532D1]">Add</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};

const addToCart = () => {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
};

const loadDetails = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <img class="h-48 mx-auto mb-4 object-contain" src="${data.image}" />
        <h2 class="text-lg font-bold mb-2">${data.title}</h2>
        <p class="text-gray-500 text-xs mb-4">${data.description}</p>
        <p class="text-xl font-bold text-[#5B42F3]">$${data.price}</p>
    `;
    product_modal.showModal();
};


loadTrendingProducts();