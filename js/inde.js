let menuTrimGlobal = [];

const loadMenuData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const menuTrimData = data.data;

  displayMenuData(menuTrimData);

  menuTrimGlobal = data;
};

const displayMenuData = (menuTrimData) => {
  const menuContainer = document.getElementById("category-container");

  menuTrimData.forEach((singleMenu) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <button onclick="displayCardData('${singleMenu.category_id}') ; sortFunc('${singleMenu.category_id}') ; " class="btn btn-sm">${singleMenu.category}</button>
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

  trimCard.forEach((singleCard) => {
    const div = document.createElement("div");

    const allMinute = singleCard.others.posted_date / 60;
    const allHours = allMinute / 60;
    const sngleMinutes = allMinute % 60;

    div.innerHTML = `
            
            <div class="max-w-86">
                <figure class="relative">
                <img class="rounded-lg h-48 w-full" src="${
                  singleCard.thumbnail
                }" alt="Shoes"/>
                <p class="bg-[#171717] absolute right-4 bottom-3 rounded-md p-1 text-[10px] text-white ${
                  singleCard.others.posted_date !== "" ? "" : "hidden"
                }">
                ${Math.trunc(allHours)} hrs ${Math.trunc(sngleMinutes)} minute
            </p>
                </figure>
                <div class="p-4 flex gap-2">

                    <img class="w-9 h-9 rounded-full"
                        src="${singleCard?.authors[0]?.profile_picture}"
                        alt="">

                    <div>
                        <h2 class="text-md font-bold">${singleCard.title}</h2>
                        <div class="flex gap-2 items-center mt-3">
                            <p class="text-md">${
                              singleCard?.authors[0]?.profile_name
                            }</p>
                            <small> ${
                              singleCard?.authors[0]?.verified == true
                                ? "<img src='./images/verified.png'>"
                                : ""
                            }</small>
                        </div>
                        <p class="text-md">${
                          singleCard?.others?.views
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
