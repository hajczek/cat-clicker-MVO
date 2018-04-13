$(function(){
    // Sets all elements for models
    let model = {
        displayedCat: null,
        cats: [
                { name: 'Filemon',  clicks: 0, image: 'img/Filemon.png'},
                { name: 'Bonifacy', clicks: 0, image: 'img/Bonifacy.png'},
                { name: 'Ginx', clicks: 0, image: 'img/Ginx.png' },
                { name: 'Smelly', clicks: 0, image: 'img/Smelly.png' },
                { name: 'Boss', clicks: 0, image: 'img/Boss.png' }
        ]
    };

    // Sets all functionalities
    let octopus = {          
        init: function() {
            model.displayedCat = model.cats[0];
            catsListView.init();
            displayedCatView.init();
            updateCat.init();
            
        },
        getAllCats: function() {
            return model.cats;
        },
        getDisplayedCat: function() {
            return model.displayedCat;
        },
        putDisplayedCat: function(cat){
            model.displayedCat = cat;
        },
        clickCounter: function(){
            model.displayedCat.clicks++;
            displayedCatView.render();
        }
    };
    
    // Displays list of cats names on page - these are clickable
    let catsListView = {
        init: function(){
            this.render();
        },
        render: function(){            
            let allCats = octopus.getAllCats();
            let catOnList = document.getElementById("list-of-cats");
            catOnList.innerHTML = "";   
            
            allCats.forEach(function(cat) {                
                let catLink = document.createElement("p");
                catLink.innerHTML = cat.name + ' »';
                
                catLink.addEventListener("click", (function(cat){
                    return function(){
                        let adminArea = document.getElementById("admin-area");
                        
                        octopus.putDisplayedCat(cat);
                        displayedCatView.render();
                        adminArea.style.display = 'none';
                    }
                })(cat));
                catOnList.appendChild(catLink);                 
            });
        }
    };
    
    // Displays data of clicked cat on page - name, image and number o clicks
    let displayedCatView = {
        init: function() {          
            this.catName = document.getElementById("name-of-cat");
            this.nameForSpan = document.getElementById("name");
            this.catClickCounter = document.getElementById("cat-click-counter");
            this.catImage = document.getElementById("image-of-cat");

            this.catImage.addEventListener("click", function(){
                octopus.clickCounter();
            });
            
            this.render();          
        },
        render: function(){
            let displayedCat = octopus.getDisplayedCat();
            
            this.catName.innerHTML = displayedCat.name;
            this.nameForSpan.innerHTML = displayedCat.name;
            this.catClickCounter.innerHTML = displayedCat.clicks;
            this.catImage.src = displayedCat.image;
        }
    };
    
    // Changes data of displayed cat by put new data in inputs elements and save it
    let updateCat = {
        init: function() {
            this.adminBtn = document.getElementById("admin");  
            this.cancelBtn = document.getElementById("cancel");
            this.saveBtn = document.getElementById("save");
            let editNameCat = document.getElementById("edit-name-cat");
            let editClicksNumber = document.getElementById("edit-clicks-number");
            let editImageCat = document.getElementById("edit-img-url");
            
            let adminArea = document.getElementById("admin-area");
            
            this.adminBtn.addEventListener("click", function(){
                adminArea.style.display = "block";
                editNameCat.value = model.displayedCat.name;
                editClicksNumber.value = model.displayedCat.clicks;
                editImageCat.value = model.displayedCat.image;
            });
            
            this.cancelBtn.addEventListener("click", function(){
                adminArea.style.display = "none";
                location.reload();
            });
            
            this.render();
        },
        
        render: function(){
            let allCats = octopus.getAllCats();
            let editNameCat = document.getElementById("edit-name-cat");
            let editClicksNumber = document.getElementById("edit-clicks-number");
            let editImgUrl = document.getElementById("edit-img-url");
       
            this.saveBtn.addEventListener("click", function(){
                this.catName = document.getElementById("name-of-cat");                
                this.nameForSpan = document.getElementById("name");                
                this.catClickCounter = document.getElementById("cat-click-counter");
                this.catImage = document.getElementById("image-of-cat"); 
                
                let changedCatName = editNameCat.value;
                let changedCatClicks = editClicksNumber.value;
                let changedCatImage = editImgUrl.value;
                
                this.catName.innerHTML = changedCatName;
                this.nameForSpan.innerHTML = changedCatName;
                this.catClickCounter.innerHTML = changedCatClicks;
                this.catImage.innerHTML = changedCatImage;
                
                localStorage.setItem('name', changedCatName);
                localStorage.setItem('clicks', changedCatClicks);
                localStorage.setItem('image', changedCatImage);
                
                let cat = octopus.getDisplayedCat();                
                let displayedCatIndex = allCats.indexOf(cat);
                
                let newName = localStorage.getItem('name');
                let newClicks = localStorage.getItem('clicks');
                let newImage = localStorage.getItem('image');
                                                                
                let newObjectCat = {name: newName, clicks: newClicks, image: newImage};
                    
                model.cats[displayedCatIndex] = newObjectCat;
                
                let catOnList = document.getElementById("list-of-cats");
                catOnList.innerHTML = "";
                
                model.cats.forEach(function(cat) {                
                    let catLink = document.createElement("p");
                    catLink.innerHTML = cat.name + ' »';

                    catLink.addEventListener("click", (function(cat){
                        return function(){
                            let adminArea = document.getElementById("admin-area");
                            octopus.putDisplayedCat(cat);
                            adminArea.style.display = 'none';

                        }
                    })(cat));
                    catOnList.appendChild(catLink);                 
                });
                
                model.displayedCat.name = newName;
                model.displayedCat.clicks = parseInt(newClicks);
                model.displayedCat.image = newImage;
            }); 
        }
    };
    
    octopus.init();
});