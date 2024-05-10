document.addEventListener("DOMContentLoaded", setUpResourcesPage);

function setUpResourcesPage() {
    const unit1 = document.querySelector('#unit1');
    const unit2 = document.querySelector('#unit2');

    unit1.isOpened = false;
    unit2.isOpened = false;
    
    unit1.children.namedItem('unit-header').addEventListener('click', handleUnitClicked);
    unit2.children.namedItem('unit-header').addEventListener('click', handleUnitClicked);
        
    function handleUnitClicked() {
        this.parentElement.classList.toggle('unit-active');
        toggleSectionDividerClasses(this.parentElement);
        toggleUnitIcon(this.parentElement);
        toggleUnitList(this.parentElement);
    }
    
    function toggleUnitIcon(unitItem) {
        let unitIcon = unitItem.children.namedItem('unit-header').children.namedItem("unit-icon");
        unitItem.isOpened ? unitIcon.src = "assets/icons/line-angle-right-icon-yellow.svg"
                        : unitIcon.src = "assets/icons/line-angle-down-icon.svg"
        unitItem.isOpened = !unitItem.isOpened;
    }
    
    function toggleSectionDividerClasses(unitItem) {
        let sectionDivider = unitItem.children.namedItem('section-divider');
        sectionDivider.classList.toggle('section-divider-active');
        sectionDivider.classList.toggle('hide');
    }
    
    function toggleUnitList(unitItem) {
        let unitList = unitItem.children.namedItem('unit-list');
        unitList.classList.toggle('hide');
    }
    
    function appendListToUnit(unit, unitListItem) {
        unitListItem.map(item => {
            appendListItemToList(unit, item);
        });
    }
    
    function appendListItemToList(unit, item) {
        let unitList = unit.children.namedItem('unit-list').children.namedItem('ordered-list');
        let newAnchorTag = createAnchorTag(item);
        let newListItemContainer = createListItemContainer();
        let newListItem = createListItem(item);
        let newImg = createImg();
        newListItemContainer.appendChild(newListItem);
        newListItemContainer.appendChild(newImg);
        newAnchorTag.appendChild(newListItemContainer);
        unitList.appendChild(newAnchorTag);
    }
    
    function createAnchorTag(item) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.href = item.href;
        newAnchorTag.target = "_blank";
        return newAnchorTag;
    }
    
    function createListItemContainer() {
        let itemContainer = document.createElement("div");
        itemContainer.classList.add("unit-item");
        return itemContainer;
    }
    
    function createListItem(item) {
        let listItem = document.createElement("li");
        listItem.innerHTML = item.description;
        return listItem;
    }
    
    function createImg() {
        let img = document.createElement("img");
        img.classList.add("unit-icon");
        img.src = DOWNLOAD_ICON;
        return img;
    }
    
    appendListToUnit(unit1, unit1ListItems);
    appendListToUnit(unit2, unit2ListItems);    
}