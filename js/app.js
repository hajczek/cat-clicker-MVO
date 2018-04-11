$(function(){
    // Sets all elements for models
    let model = {
        displayedCat: null,
        cats: [
                { name: 'Filemon',  clicks: 0 },
                { name: 'Bonifacy', clicks: 0 },
                { name: 'Ginx', clicks: 0 },
                { name: 'Smelly', clicks: 0 },
                { name: 'Boss', clicks: 0 }
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
                        octopus.putDisplayedCat(cat);
                        displayedCatView.render();
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
            this.catImage.src = 'img/' + displayedCat.name + '.png';   
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
            
            let adminArea = document.getElementById("admin-area");
            
            this.adminBtn.addEventListener("click", function(){
                adminArea.style.display = "block";
                editNameCat.value = model.displayedCat.name;
                editClicksNumber.value = model.displayedCat.clicks;
            });
            
            this.cancelBtn.addEventListener("click", function(){
                adminArea.style.display = "none";
                location.reload();
            });
            
            this.render();
        },
        
        render: function(){
            let allCats = octopus.getAllCats();
            let displayedCat = octopus.getDisplayedCat();
            let editNameCat = document.getElementById("edit-name-cat");
            let editClicksNumber = document.getElementById("edit-clicks-number");
            let editImgUrl = document.getElementById("edit-img-url");
       
            this.saveBtn.addEventListener("click", function(){                
                this.catName = document.getElementById("name-of-cat");                
                this.nameForSpan = document.getElementById("name");                
                this.catClickCounter = document.getElementById("cat-click-counter");
                
                let changedCatName = editNameCat.value;
                let changedCatClicks = editClicksNumber.value;
                
                this.catName.innerHTML = changedCatName;
                this.nameForSpan.innerHTML = changedCatName;
                this.catClickCounter.innerHTML = changedCatClicks;
                
                localStorage.setItem('name', changedCatName);
                localStorage.setItem('clicks', changedCatClicks);
                
                /*changedCatName = '';
                changedCatClicks = ''; */
                
                // TODO: Put the `changedCatName`, `changedCatClicks` in cats array ....
                
               // model.cats[displayedCat.index].push(changedCatName, changedCatClicks);
                
                console.log(localStorage.getItem('name'));
                console.log(localStorage.getItem('clicks'));
            
            });            
        }
    };
    
    octopus.init();
});