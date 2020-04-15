var arr = [
    84,
    100,
    122,
    199,
    175,
    60,
    131,
    159,
    128,
    200,
    73,
    18,
    162,
    171,
    205,
    179,
    132,
    50,
    78,
    90,
    85,
    189,
    26,
    85,
    22,
    23,
    202,
    122,
    46,
    85,
    169,
    86,
    178,
    143,
    73,
    148,
    28,
    61,
    128,
    191,
    38,
    120,
    155,
    92,
    196,
    179,
    74,
    173,
    74,
    195,
    173,
    11,
    155,
    50,
    13,
    128,
    165,
    40,
    160,
    144,
    139,
    60,
    17,
    62,
    82,
    52,
    102,
    95,
    98,
    151,
    60,
    84,
    100,
    76,
    194,
    209,
    163,
    18,
    162,
    100,
    43,
    131,
    74,
    189,
    184,
    163,
    108
];

const INITIAL_ARR = [...arr];
// arr = arr.slice(0, arr.length - 15);
// let HEAP_SIZE = arr.length - 1;
// arr.reverse();

// arr = arr.slice(0, Math.round(arr.length / 11));
let elementCounter = 1;
let step = 2;
const DOMSelectors = {
    container: '.container',
    list: '.list',
};
const CONSTANTS = {
    RED: "#c0392b",
    BLUE: "#2980b9",
    text: "#34495e",
    MERGE_SORT: 'mergeSort',
    HEAP_SORT: 'heapSort',
    QUICK_SORT: 'quickSort',
    INSERTION_SORT: 'insertionSort',
    BUBBLE_SORT: 'bubbleSort',
};

const state = {
    currentAlgo: 'mergeSort',
};

let currentComparing = [arr.length- 1, arr.length - 2];

async function bubbleSort() {
    for (let i = 0 ; i < arr.length -1; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            setTimeout((j, step) => {
                LIST_ITEMS = getListItemsAll();
                currentComparing = [j , j - 1];
                setCurrentItems(j, j - 1);
                setTimeout(() => {
                    if (arr[j] < arr[j - 1]) {
                        setCurrentComparingItems(j, j - 1);
                        setTimeout(() => {
                            const temp = arr[j];
                            arr[j] = arr[j - 1];
                            arr[j - 1] = temp;
                            removeList();
                            generateList();
                            DOMElements = getDOMElements();
                            // cleanItems(j, j - 1);
                        }, 5);
                    } else {
                        cleanItems(j, j - 1);
                    }        
                }, 5)
            }, 20 * elementCounter, j, step);
            elementCounter += step;
        }
    }
    return Promise.resolve();
}

async function insertionSort() {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        setCurrentItems(i, j);
        await fakeAsync();
        while (j >= 0 && arr[j] > key) {
            setCurrentComparingItems(j, i);
            await fakeAsync();
            arr[j + 1] = arr[j];
            cleanItems(i, j);
            j--;
            removeList();
            generateList();
            DOMElements = getDOMElements();
            LIST_ITEMS = getListItemsAll();
        }
        setCurrentComparingItems(j + 1, i);
        await fakeAsync();
        arr[j + 1] = key;
        removeList();
        generateList();
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
    }
    removeList();
    generateList();
    DOMElements = getDOMElements();
    LIST_ITEMS = getListItemsAll();
}

async function maxHepify(i) {
    const leftEle = leftHeapEle(i);
    const rightEle = rightHeapEle(i);
    let largest = i;
    if (HEAP_SIZE >= leftEle && arr[largest] < arr[leftEle]) {
        largest = leftEle;
    }
    if (HEAP_SIZE >= rightEle && arr[largest] < arr[rightEle]) {
        largest = rightEle;
    }
    if (largest !== i) {
        setCurrentItems(largest, i);
        await fakeAsync();
        setCurrentComparingItems(largest, i);
        await fakeAsync();
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        cleanItems(i, largest);
        removeList();
        generateList();
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
        await maxHepify(largest);
    }
    removeList();
    generateList();
    DOMElements = getDOMElements();
    LIST_ITEMS = getListItemsAll();
    return Promise.resolve();
}
const leftHeapEle = i => (2 * i) + 1;
const rightHeapEle = i => (2 * i) + 2;
async function buildMaxHeap() {
    const mid = Math.floor(arr.length / 2);
    for (let i = mid; i >= 0; i--) {
        removeList()
        generateList()
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
        await maxHepify(i);
        removeList()
        generateList()
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
    }
    removeList();
    generateList();
    DOMElements = getDOMElements();
    LIST_ITEMS = getListItemsAll();
    return Promise.resolve();
}
async function heapSort() {
    await buildMaxHeap();
    for (let i = arr.length - 1; i >= 1; i--) {
        setCurrentComparingItems(i, 0);
        await fakeAsync();
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        HEAP_SIZE -= 1;
        cleanItems(i, 0);
        removeList()
        generateList()
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
        await maxHepify(0);
    }
    return Promise.resolve();
}

async function quickSort(start, end) {
    if (start < end) {
        const middle = await partition(start, end);
        await quickSort(start, middle - 1);
        await quickSort(middle + 1, end);
    }
    return Promise.resolve();
}

async function partition(start, end) {
    let i = start - 1;
    let j = start;
    let pivot = arr[end];
    setPivotElement(end);
    while (j < end) {
        setCurrentItems(j, end);
        setPivotElement(end);
        setBackedElement(i);
        await fakeAsync();
        if (arr[j] <= pivot) {
            setCurrentComparingItems(j, i);
            await fakeAsync();
            i += 1;
            swap(i, j);
            cleanItems(j, i);
        }
        removeList();
        generateList();
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
        j++;
    }
    setCurrentItems(i + 1, end);
    await fakeAsync();
    setCurrentComparingItems(i + 1, end);
    await fakeAsync();
    swap(i + 1, end);
    removeList();
    generateList();
    DOMElements = getDOMElements();
    LIST_ITEMS = getListItemsAll();
    return new Promise(res => res(i + 1));
}

function swap(i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

async function mergeSort(p, r) {
    if (p < r) {
        let q = Math.floor((p + r) / 2);
        await mergeSort(p, q);
        await mergeSort(q + 1, r);
        await merge(p, q, r);
    }
    return Promise.resolve();
}

async function merge(p, q, r) {
    let n1 = q - p + 1;
    let n2 = r - q;
    let left = [];
    let right = [];
    for (let i = 0; i < n1; i++) {
        left.push(arr[p + i]);
    }
    for (let i = 0; i < n2; i++) {
        right.push(arr[q + i + 1]);
    }
    left.push(Infinity);
    right.push(Infinity);
    let i = 0, j = 0;
    for (let k = p; k <= r; k++) {
        setCurrentItems(p + i, q + i + 1);
        await fakeAsync();
        if (left[i] <= right[j]) {
            setCurrentComparingItems(k, p + i);
            await fakeAsync();
            arr[k] = left[i++];  
        } else {
            setCurrentComparingItems(k, q + i + 1);
            await fakeAsync();
            arr[k] = right[j++];
        }
        cleanItems(p + i, q + i + 1);
        cleanItems(k);
        removeList();
        generateList();
        DOMElements = getDOMElements();
        LIST_ITEMS = getListItemsAll();
    }
    return Promise.resolve();
}

async function fakeAsync() {
    return new Promise(res => {
        setTimeout(res, 10);
    });
}

function setCurrentItems(ind1, ind2) {
    try {
        const item1 = LIST_ITEMS[ind1];
        item1.style.backgroundColor = "#2980b9";
    } catch(e){}
    try {
        const item2 = LIST_ITEMS[ind2];
        item2.style.backgroundColor = "#2980b9";
    } catch(e){}
}

function setCurrentComparingItems(ind1, ind2) {
    try {
        const item1 = LIST_ITEMS[ind1];
        item1.style.backgroundColor = "#c0392b";
    } catch(e) {}
    try {
        const item2 = LIST_ITEMS[ind2];
        item2.style.backgroundColor = "#c0392b";
    } catch(e) {}
}

function setPivotElement(ind) {
    const item1 = LIST_ITEMS[ind];
    item1.style.backgroundColor = "#f1c40f";
}

function setBackedElement(ind) {
    try {
        const item1 = LIST_ITEMS[ind];
        item1.style.backgroundColor = "#7f8c8d";
    } catch(e) {}
}

function cleanItems(ind1, ind2) {
    try {
        const item1 = LIST_ITEMS[ind1];
        item1.style.backgroundColor = "#34495e";
    } catch(e) {}
    try {
        const item2 = LIST_ITEMS[ind2];
        item2.style.backgroundColor = "#34495e";
    } catch(e) {} 
}

function removeList() {
    DOMElements.list.remove();
}

function generateList() {
    const ul = document.createElement("ul");
    ul.classList.add("list");
    for (let i = 0; i < arr.length; i++) {
        ul.appendChild(getListItem(arr[i]));   
    }
    DOMElements.container.appendChild(ul);
}

function getListItem(normalHeight) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.style.height = `${normalHeight * 2.5}px`;
    li.dataset.data = normalHeight;
    return li;
}

function getListItemsAll() {
    return [...document.querySelectorAll(".list-item")];
}

function getDOMElements() {
    let DOMElements = {};
    for (let selector in DOMSelectors) {
      DOMElements[selector] = document.querySelector(DOMSelectors[selector]);
    }
    return DOMElements;
}

// let DOMElements = getDOMElements();
// generateList();
// let LIST_ITEMS = getListItemsAll();
// DOMElements = getDOMElements();

// bubbleSort(); 
// insertionSort();
// heapSort();
// quickSort(0, arr.length - 1);
// mergeSort(0, arr.length - 1);

function resetData() {
    arr = INITIAL_ARR;
    arr = arr.slice(0, arr.length - 15);
    HEAP_SIZE = arr.length - 1;
    arr.reverse();
    DOMElements = getDOMElements();
    try {
        removeList();
    } catch(e) {}
    generateList();
    LIST_ITEMS = getListItemsAll();
    DOMElements = getDOMElements();
}

async function startAlgo() {
    document.querySelector('.header').classList.add("deactive");
    switch(state.currentAlgo) {
        case CONSTANTS.MERGE_SORT:
            await mergeSort(0, arr.length - 1);
            break;
        case CONSTANTS.HEAP_SORT:
            HEAP_SIZE = arr.length - 1;
            await heapSort();
            break;
        case CONSTANTS.QUICK_SORT:
            await quickSort(0, arr.length - 1);
            break;
        case CONSTANTS.INSERTION_SORT:
            await insertionSort();
            break;
        case CONSTANTS.BUBBLE_SORT:
            await bubbleSort();
            break;
    };
    document.querySelector('.header').classList.remove("deactive");

}

function setAlgo(event) {
    state.currentAlgo = event.target.id;
}

let inputs = [...document.querySelectorAll("input")];
inputs.forEach(input => {
    input.addEventListener("change", setAlgo);
});

document.querySelector('.viz').addEventListener('click', startAlgo);
document.querySelector('.rst').addEventListener('click', resetData);

resetData();
