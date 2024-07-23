

document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');
  
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  
    function renderList() {
      shoppingList.innerHTML = '';
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = item.purchased ? 'purchased' : '';
        li.addEventListener('click', () => togglePurchased(index));
        li.addEventListener('dblclick', () => editItem(index));
        shoppingList.appendChild(li);
      });
    }
  
    function addItem() {
      const itemText = itemInput.value.trim();
      if (itemText) {
        items.push({ text: itemText, purchased: false });
        itemInput.value = '';
        saveAndRender();
      }
    }
  
    function togglePurchased(index) {
      items[index].purchased = !items[index].purchased;
      saveAndRender();
    }
  
    function clearList() {
      items = [];
      saveAndRender();
    }
  
    function saveAndRender() {
      localStorage.setItem('shoppingList', JSON.stringify(items));
      renderList();
    }
  
    function editItem(index) {
      const newText = prompt('Edit item:', items[index].text);
      if (newText !== null) {
        items[index].text = newText.trim();
        saveAndRender();
      }
    }
  
    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
  
    itemInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addItem();
      }
    });
  
    renderList();
  });
  