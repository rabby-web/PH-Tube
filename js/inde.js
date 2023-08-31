const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categoryData = data.data;
  //   console.log(categoryData);
  categoryData.forEach((category) => {
    const categoryContainer = document.getElementById("category-container");
    const p = document.createElement("p");
    p.innerHTML = `
    <p onclick="handleLoadData('${category.category_id}')" 
             class="bg-slate-500 mx-2 py-2 px-4 rounded text-white text-lg font-semibold"
          >
            ${category.category}
          </p>
    `;
    categoryContainer.appendChild(p);
  });
};
const handleLoadData = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const categoryLoadData = await response.json();
  const categoryCard = categoryLoadData.data;
  console.log(categoryCard);
  const cardContainer = document.getElementById("card-container");
  categoryCard.forEach((c) => {
    // console.log(c?.thumbnail);
    // console.log(c?.authors[0]?.profile_picture);
    // console.log(c?.authors[0]?.profile_name);
    // console.log(c?.others.views);
    const div = document.createElement("div");
    div.classList = `card w-full bg-base-100 shadow-xl`;
    div.innerHTML = `
    <figure>
    <img class="w-full h-72 rounded-lg" src="${c.thumbnail}" alt="Shoes" />
    </figure>
    <div class="div p-3">
     <div class="flex">
        <div class="w-16 h-16 rounded-full m-2">
            <img class="rounded-full w-16 h-16" src="${c?.authors[0]?.profile_picture}" />
        </div>
        <div>
            <h2 class="text-xl font-bold">${c.title}</h2>
            <p class="text-base">${c?.authors[0]?.profile_name}</p>
            <p class="text-sm">${c.category_id}</p>
        </div>
     </div>
    `;
    cardContainer.appendChild(div);
  });
};
handleLoadData("1001");
// handleLoadData();
handleCategory();
