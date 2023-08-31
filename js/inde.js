const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categoryData = data.data;
  console.log(categoryData);
  categoryData.forEach((category) => {
    const categoryContainer = document.getElementById("category-container");
    const p = document.createElement("p");
    p.innerHTML = `
    <p
            class="bg-slate-500 mx-2 py-2 px-4 rounded text-white text-lg font-semibold"
          >
            ${category.category}
          </p>
    `;
    categoryContainer.appendChild(p);
  });
};
handleCategory();
