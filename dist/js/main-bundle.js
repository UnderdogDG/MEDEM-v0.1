// const THREE = require('three');
console.log("Script working!!...");
/* #region [1] VARS */
console.log("hi");

const wH = window.innerHeight;
const scrollers = document.getElementsByClassName('scroll');
const txt = document.getElementById("txt");
const fra = [ 'Bienvenido', 'Bienvenido', 'Explora', 'Explora', 'Conoce', 'Conoce'];
const NEXT = 'NEXT';
const PREV = 'PREV';
let elemt = 1;
let intElmt = 0;
let maxElemt = scrollers.length;
/* #endregion */

/* #region [2] STORE */
const store = (reducer)=>{
    let state = {
        slide: 0
    };
    const listeners = [];
    const getstate = ()=> state;
    const subscribe = (listener)=>{
        listeners.push(listener);
    };
    const dispatch = (action)=>{
        state = reducer(state, action);
        listeners.forEach(listener => listener(state));
    };
    return{ getstate, dispatch, subscribe }
};
/* #endregion */

/* #region [3] REDUCER */
const reducer = (state={slide:0}, action)=>{
    let cont = state.slide + action.payload;
    switch (action.type) {
        case NEXT:
            if (cont>maxElemt+1){
                return Object.assign({}, state, {slide: 1, dir: action.payload});
            }else{
                return Object.assign({}, state, {slide: cont, dir: action.payload});
            }
            break;
        case PREV:
            if (cont<0){
                return Object.assign({}, state, {slide: maxElemt, dir: action.payload});
            }else{
                return Object.assign({}, state, {slide: cont, dir: action.payload});
            }
            
            break;
        default:
            return state;
    }

};
/* #endregion */

/* #region [4] ACTIONS */
const actions = {
    next(){
        return {
            type: NEXT,
            payload: 1
        }
    },
    prev(){
        return{
            type: PREV,
            payload: -1
        }
    }
}
/* #endregion */

/* #region [5] SUBSCRIPTIONS */
const createStore= store(reducer);
createStore.subscribe((x)=>{
    switch (x.dir) {
        case 1:
            if (x.slide>maxElemt){
                scrollers[0].classList.remove('bottom');
                scrollers[0].classList.add('top');
                for(let i = 0; i<maxElemt;i++){
                    scrollers[i].classList.remove('slide');
                }
                setTimeout(()=>{
                    scrollers[0].classList.remove('top');
                    scrollers[0].classList.add('bottom');
                }, 700);
            }
            else{
                scrollers[x.slide-1].classList.add('slide');
            }
            break;
        case -1:
            if(x.slide == maxElemt){
                scrollers[0].classList.remove('bottom');
                scrollers[0].classList.add('top');
                for(let i = 0; i<maxElemt;i++){
                    scrollers[i].classList.add('slide');
                }
                setTimeout(()=>{
                    scrollers[0].classList.remove('top');
                    scrollers[0].classList.add('bottom');
                }, 700);
            }
            else{
                scrollers[x.slide].classList.remove('slide');
            }
        default:
            break;
    }   
});
/* #endregion */

/* #region [6] fx WHEEL -- INCOMPLETO!!!! --*/
document.addEventListener("wheel", (x)=>{
    intElmt+=1;
    if(intElmt>=3){
        intElmt=0;
        createStore.dispatch(actions.next());
    }
});
/* #endregion */

/* #region [7] fx KEY */
document.addEventListener('keyup', (x)=>{
    switch (x.key){
        case "ArrowUp":
            createStore.dispatch(actions.prev());
        break;
        case "ArrowDown":
            createStore.dispatch(actions.next());
        break;
    }  
});
/* #endregion */

/* #region [8] fx CLICK */
document.addEventListener("click", (x)=>{
    createStore.dispatch(actions.next());
});
/* #endregion */

/* #region [9] fx TEXT */
txt.addEventListener('animationiteration', ()=>{
    if(elemt>fra.length-1){
        txt.innerHTML=fra[0];
        elemt = 1;
    }
    else{
        txt.innerHTML=fra[elemt];
        elemt++;
    }
});
/* #endregion */