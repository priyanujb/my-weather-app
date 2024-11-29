
const key = "f7c3057ebbf51bf26fe930e76702c5dc";
const form = document.querySelector(".box1 form");
const input = document.querySelector(".box1 input");
const msg = document.querySelector(".box1 .msg");
const cityList = document.querySelector(".citySection .cities");



form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

 
  const listItems = cityList.querySelectorAll(".citySection .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
    //   ..........
      if (inputVal.includes(",")) {
        // ................................
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
    
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    
  }

//  .................................................................................
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
        }.svg`;

        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <span>
                    <img class="city-icon" src="${icon}" alt="${
                        weather[0]["description"]
                    }">
                </span>
                <span class="figureCaption">
                    ${weather[0]["description"]}
                </span>
            </figure>
        `;

        li.innerHTML = markup;

        
        const firstChild = cityList.firstChild;
        cityList.insertBefore(li, firstChild);
    })
    .catch(() => {
        msg.textContent = "INVALID CITY NAME";
    });


  msg.textContent = "";
  form.reset();
  input.focus();
});