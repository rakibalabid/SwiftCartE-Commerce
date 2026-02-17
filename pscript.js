let cartCount = 0;


const loadCategories = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();
        displayCategories(categories);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
};

const displayCategories = (categories) => {
    const container = document.getElementById('category-container');
    container.innerHTML = "";
    
    // 'All' button
    const allBtn = document.createElement('button');
    allBtn.classList = "btn btn-sm px-6 rounded-full border-gray-200 bg-[#5B42F3] text-white hover:bg-[#4532D1] category-tab active-tab";
    allBtn.innerText = "All";
    allBtn.onclick = (e) => {
        handleActiveTab(e);
        loadAllProducts();
    };
    container.appendChild(allBtn);

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList = "btn btn-sm px-6 rounded-full border-gray-200 bg-white text-gray-600 hover:bg-gray-100 capitalize category-tab";
        btn.innerText = category;
        btn.onclick = (e) => {
            handleActiveTab(e);
            loadAllProducts(category);
        };
        container.appendChild(btn);
    });
};

const handleActiveTab = (event) => {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.classList.remove('bg-[#5B42F3]', 'text-white');
        tab.classList.add('bg-white', 'text-gray-600');
    });
    event.target.classList.remove('bg-white', 'text-gray-600');
    event.target.classList.add('bg-[#5B42F3]', 'text-white');
};

// ২. সব প্রোডাক্ট লোড করা
const loadAllProducts = async (category = null) => {
    const container = document.getElementById('all-product-container');
    const spinner = document.getElementById('spinner');
    
    container.innerHTML = "";
    spinner.classList.remove('hidden');

    let url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';

    try {
        const res = await fetch(url);
        const products = await res.json();
        spinner.classList.add('hidden');
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
};

const displayProducts = (products) => {
    const container = document.getElementById('all-product-container');
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList = "card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden";
        card.innerHTML = `
            <figure class="bg-[#F8F8F8] h-56 flex items-center justify-center p-6">
                <img src="${product.image}" alt="${product.title}" class="max-h-full mix-blend-multiply transition-transform hover:scale-110 duration-300" />
            </figure>
            <div class="card-body p-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="bg-blue-50 text-[#5B42F3] text-[9px] font-bold px-2 py-1 rounded uppercase">${product.category}</span>
                    <span class="text-[10px] text-gray-500 font-semibold"><i class="fa-solid fa-star text-orange-400"></i> ${product.rating.rate}</span>
                </div>
                <h2 class="font-bold text-gray-800 text-xs h-8 overflow-hidden mb-2">${product.title}</h2>
                <p class="text-lg font-black text-gray-900 mb-4">$${product.price}</p>
                <div class="flex gap-2">
                    <button onclick="loadDetails(${product.id})" class="btn btn-xs flex-1 bg-white border-gray-200 text-gray-600">Details</button>
                    <button onclick="addToCart()" class="btn btn-xs flex-1 bg-[#5B42F3] text-white border-none hover:bg-[#4532D1]">Add</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};

// কার্ট এবং মডাল ফাংশন (index.html এর মতই)
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

loadCategories();
loadAllProducts();