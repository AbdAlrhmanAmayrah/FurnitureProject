const apiUrl = 'https://dummyjson.com/c/c18c-6674-4096-8c5f';
let currentPage = 1;
const productsPerPage = 8; 
let totalProducts = 0;
let totalPages = 0;

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        totalProducts = data.products.length;
        totalPages = Math.ceil(totalProducts / productsPerPage);
        renderProducts(data.products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage));
        renderPagination();
    } catch (error) {
        console.error(error);
        document.getElementById('product-container').innerHTML = '<p>Failed to load products.</p>';
    }
}

function renderProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = products
        .map(product => `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}" />
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><span class="price">$${product.price}</span></p>
                </div>
            </div>
        `).join('');
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Prev</button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>
    `;
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    fetchProducts();
}

document.addEventListener('DOMContentLoaded', fetchProducts);
