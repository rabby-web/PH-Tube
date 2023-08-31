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
             class="bg-slate-300 mx-2 py-2 px-4 rounded text-lg font-semibold"
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
  cardContainer.innerHTML = " ";
  categoryCard.forEach((c) => {
    // console.log(c?.thumbnail);
    // console.log(c?.authors[0]?.profile_picture);
    console.log(c?.authors[0]?.verified);
    // console.log(c?.others);
    const div = document.createElement("div");
    div.classList = `card w-full bg-base-100 shadow-xl`;
    div.innerHTML = `
    <figure>
    <img class="w-full h-64 rounded-lg" src="${c.thumbnail}" alt="Shoes" />
    </figure>
    <div class="div p-3">
     <div class="flex">
        <div class="w-10 rounded-full m-2">
            <img class="rounded-full w-10 h-10" src="${
              c?.authors[0]?.profile_picture
            }" />
        </div>
        <div class="space-y-2">
            <h2 class="text-2xl font-bold mt-1">${c.title}</h2>
            <p class="text-lg items-center font-semibold flex"><small class="pr-1">${
              c?.authors[0]?.profile_name
            }</small>  <small> ${
      c?.authors[0]?.verified == true ? "../p.svg" : "False"
    }</small></p>
            <p class="text-sm">${c.category_id} views</p>
        </div>
     </div>
    `;
    cardContainer.appendChild(div);
  });
};
// const handleEmptyData =
handleLoadData("1000");
// handleLoadData();
handleCategory();
