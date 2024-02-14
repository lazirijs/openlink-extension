console.log("Open Link Activated");

const editeOnDOM = () => {
  // Your code to run after DOMContentLoaded
  const elements = document.querySelectorAll("tr");

  const character = '+';

  for (let i = 2; i < elements.length; i++) {

    const children = Object.values(elements[0].children);

    const index2 = children.findIndex(child => child.innerText == 'N°');
    const index7 = children.findIndex(child => child.innerText == 'Description');

    const url = elements[i].children[index2];
    const description = elements[i].children[index7];

    let text = {
      url: '',
      description: ''
    };

    if (description) {
      // Get all <a> tags within the tdElement
      const aTags = description.querySelectorAll("a");
      // Iterate through each <a> tag and remove it
      aTags.forEach(aTag => {
        aTag.remove();
      });
      text.description = description.textContent.trim();
    }

    // if (url) {
    //   // Get all <a> tags within the tdElement
    //   const aTags = url.querySelectorAll("a");
    //   // Iterate through each <a> tag and remove it
    //   aTags.forEach(aTag => {
    //     aTag.remove();
    //   });
    //   text.url = `<h6 style='width: 100%;'>remote.bmlabserver.com/TicketEdit/${url.textContent.replaceAll(',', '').replaceAll('remote.bmlabserver.com/TicketEdit/', '').replaceAll(' ', '')}</h6>`;
    //   text.url = text.url;
    // }
    //debugger;

    // Replace all numbers starting with 0 with links
    let editedDescription = text.description.replace(/(?:^|\s)(\d+)/g, (e, number) => {
      if (number.length >= 9) {
        if (number.startsWith("0") || number.startsWith("+")) {
          return ` ${number} 
          <a href="tel:${number}" style="text-decoration: none; font-weight: 900; color: blue;">${character}</a> 
          <a href="whatsapp://send?phone=${(number.startsWith("0") ? "+213" : "+212") + Number(number)}" style="text-decoration: none; font-weight: 900; color: green;">${character}</a>`;
        } else {
          return ` ${number} <a href="anydesk:${number}" style="text-decoration: none; font-weight: 900; color: red;">${character}</a>`;
        }
      } else {
        return number;
      }
    });

    // Set the updated HTML content back to the element
    //if(!description)debugger;
    const child = {
      url: url ? url : elements.item(i).children[index2],
      description: description ? description : elements.item(i).children[index7]
    }
    // console.log(child);

    // child.url.innerHTML = text.url;
    if (child.description) {
      child.description.innerHTML = editedDescription;
    }
  };
};

setInterval(() => {
  editeOnDOM();
}, 2000);