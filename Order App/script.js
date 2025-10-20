let isOredrAccepted = false;
let isValetFound = false;
let hasResturantSeenYourOrder = false;
let restaurentTime = null;
let valetTimer = null;
let valetDeliveryTime = null;
let isOrderDelivered = false;

window.addEventListener("load", function(){
    document.getElementById("acceptOrder").addEventListener("click", function(){
        askResturantToAcceptOrReject()
    })

    document.getElementById('findValet').addEventListener('click', function(){
        StartSearchingForValets()
    })

        document.getElementById('deliverOrder').addEventListener('click', function(){
       setTimeout(() => {
        isOrderDelivered = true;
       }, 2000);
    })
     checkIfOrderAcceptFromRestaurant()
        .then(res=>{
            console.log('updated from resturant',res);
            if (isOredrAccepted) startPerparingOrder()
                else alert('Sorry resturant couldnt your order! Resturant your around zomato shares')
        })
        .catch(err=>{
            console.log(err);
            alert('Something went worng! Please try again later')
        })
})

function askResturantToAcceptOrReject(){
   setTimeout(() => {
     isOredrAccepted = confirm('Should restaurent accept order')
    hasResturantSeenYourOrder = true;
     console.log(isOredrAccepted);
     
   },1000)

}


function checkIfOrderAcceptFromRestaurant() {
    return new Promise((resolve,reject) =>{
         restaurentTime = setInterval(() => {
            console.log('checking if order accepted or not');
            if(!hasResturantSeenYourOrder) return; 
            
        if(isOredrAccepted) resolve(true);
        else reject(false)
        clearInterval(restaurentTime)
    },2000)
    });
}

function startPerparingOrder(){
    Promise.allSettled([
        updateOrderStatus(),
        updateMapView(),
        updateValetDetails(),
        checkIfValetAssigned(),
        checkIfOrderDelivery()
    ])
    .then(res=>{
        console.log(res);
        setTimeout(()=>{
            alert('How was your food? Rate your food and delivery partner')
        },5000)
    })
    .catch(err=>{
        console.error(err);
        
    })
}

function updateOrderStatus(){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
              document.getElementById("currentStatus").innerText = isOrderDelivered ? 'Order Delivered successfully' : 'Preparing your order'
                resolve('status update')
        },1500)
    })
  
}

function updateMapView(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            document.getElementById("mapview").style.opacity = 'l';
            resolve('map initialised')
        },1000)
    })
   
}

function StartSearchingForValets(){
    let valetsPromises = [];  
    for (let i = 0; i<5; i++) {
        valetsPromises.push(getRandomDriver())
    }
    console.log(valetsPromises);
    Promise.any(valetsPromises)
    .then(selectedValet => {
        console.log('Selected a valet =>', selectedValet);
        isValetFound =true;
    })
    .catch(err=>{
        console.error(err);
        
    })
    
}

function getRandomDriver(){
    return new Promise((resolve,reject)=>{
        const timeout = Math.random()*1000;
        setTimeout(()=>{
            resolve('Valet - '+timeout)
        },timeout)
    })
}

function checkIfValetAssigned(){
        return new Promise((resolve,reject)=>{
            valetTimer = setInterval(()=>{
                console.log('searching for valet');
                if (isValetFound) {
                    updateValetDetails();
                    resolve('updated valet details')
                    clearTimeout(valetTimer)
                } 
            },1000)
        })
    }

    function checkIfOrderDelivery(){
          return new Promise((resolve,reject)=>{
            valetDeliveryTime = setInterval(()=>{
                console.log('is order delivered by valet');
                if (isOrderDelivered) {
                    resolve('order delivered valet details')
                    updateOrderStatus()
                    clearTimeout(valetDeliveryTime)
                } 
            },1000)
        })
    }
    function updateValetDetails(){
          if (isValetFound ) {
            document.getElementById('finding-driver').classList.add('none')
            document.getElementById('found-driver').classList.remove('none')
            document.getElementById('call').classList.remove('none')
          }
    }