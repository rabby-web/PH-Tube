let menuTrimGlobal = [];

const loadMenuData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const menuCategoryData = data.data;

  displayMenuData(menuCategoryData);

  menuTrimGlobal = data;
};

const displayMenuData = (menuCategoryData) => {
  const menuContainer = document.getElementById("category-container");

  menuCategoryData.forEach((singleMenu) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <p onclick="displayCardData('${singleMenu.category_id}') ; sortFunc('${singleMenu.category_id}') ; " class="px-3 md:px-6 py-2 m-1 md:m-2 text-base md:text-xl rounded font-semibold bg-slate-300">${singleMenu.category}</p>
        `;
    menuContainer.appendChild(div);

    displayCardData("1000");
  });
};

const displayCardData = async (categoryId, sotto = false) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  const trimCard = data.data;

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  const empltyContainer = document.getElementById("empty-container");

  if (!trimCard[0]) {
    empltyContainer.classList.remove("hidden");
  } else {
    empltyContainer.classList.add("hidden");
  }

  if (sotto == true) {
    trimCard.sort((a, b) => {
      return parseFloat(b.others.views) - parseFloat(a.others.views);
    });
  }

  trimCard.forEach((singleCardData) => {
    const div = document.createElement("div");

    const allMinute = singleCardData.others.posted_date / 60;
    const allHours = allMinute / 60;
    const sngleMinutes = allMinute % 60;

    div.innerHTML = `
            
            <div class="max-w-86 shadow-lg rounded-lg">
                <figure class="relative">
                <img class="rounded-lg h-56 w-full" src="${
                  singleCardData.thumbnail
                }" alt="Shoes"/>
                <p class="bg-[#171717] absolute right-4 bottom-3 rounded-md p-1 text-[12px] text-white ${
                  singleCardData.others.posted_date !== "" ? "" : "hidden"
                }">
                ${Math.trunc(allHours)} hrs ${Math.trunc(sngleMinutes)} minute
            </p>
                </figure>
                <div class="p-4 flex gap-2">

                    <img class="w-12 h-12 rounded-full"
                        src="${singleCardData?.authors[0]?.profile_picture}"
                        alt="">

                    <div>
                        <h2 class="text-xl font-bold">${
                          singleCardData.title
                        }</h2>
                        <div class="flex gap-2 items-center mt-2">
                            <p class="text-md">${
                              singleCardData?.authors[0]?.profile_name
                            }</p>
                            <small> ${
                              singleCardData?.authors[0]?.verified == true
                                ? "<img src='../image/svg-icon.svg'>"
                                : ""
                            }</small>
                        </div>
                        <p class="text-md">${
                          singleCardData?.others?.views
                        } views</p>
                    </div>


                </div>
            </div>
        `;

    cardContainer.appendChild(div);
  });
};

loadMenuData();

const sortFunc = (id) => {
  const btnContainer = document.getElementById("sort-button-wrapper");
  btnContainer.textContent = "";
  btnContainer.innerHTML = `
        <button onclick="displayCardData('${id}', true)" class="btn btn-sm md:btn-md">Sort by view</button>
    `;
};
