export const svg = ({
    fill = "#043458",
    stroke = "#043458",
    w = 24,
    h = 24,
    classes = "",
    id = ""
} = {}) => {
    return {
        pen: `
            <svg id="${id}" class="${classes}" viewBox="0 0 ${w} ${h}" fill="${fill}" xmlns="http://www.w3.org/2000/svg" stroke="${stroke}">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg>
        `,

        check: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg" stroke="${stroke}">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg>
        `,

        close: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg" stroke="${stroke}">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g id="Menu / Close_MD">
                        <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </g>
            </svg>
        `,

        warning: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M12 8V12" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                    <circle cx="12" cy="15" r="1" fill="${stroke}"></circle>
                    <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 14.4963 20.1632 16.4284 19 17.9041M3.19284 14C4.05026 18.2984 7.57641 20.5129 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C14.6796 21.2747 15.3324 20.9478 16 20.5328" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
        `,

        loader: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 97.541 97.54" xml:space="preserve" stroke="${stroke}">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <g>
                                <path d="M70.063,27.182c1.398,1.175,3.174,1.821,4.996,1.821c2.312,0,4.488-1.014,5.974-2.782 c2.76-3.289,2.329-8.211-0.96-10.973c-1.4-1.175-3.176-1.822-5-1.822c-2.311,0-4.487,1.014-5.971,2.782 C66.341,19.498,66.773,24.419,70.063,27.182z"></path>
                                <path d="M88.445,36.096c-0.483,0-0.971,0.043-1.448,0.127c-4.485,0.791-7.493,5.086-6.702,9.573 c0.696,3.955,4.111,6.825,8.119,6.825c0.482,0,0.972-0.043,1.451-0.126c4.485-0.792,7.492-5.086,6.701-9.571 C95.868,38.968,92.452,36.096,88.445,36.096z"></path>
                                <path d="M88.158,63.113c-1.328-0.768-2.834-1.172-4.354-1.172c-3.118,0-6.022,1.675-7.579,4.371 c-1.165,2.019-1.477,4.371-0.872,6.625s2.052,4.139,4.069,5.304c1.329,0.769,2.835,1.174,4.357,1.174 c3.116,0,6.02-1.674,7.576-4.369C93.761,70.874,92.327,65.521,88.158,63.113z"></path>
                                <path d="M63.316,78.646c-1.07,0-2.13,0.188-3.15,0.558c-2.31,0.841-4.153,2.532-5.193,4.761c-1.039,2.229-1.148,4.729-0.308,7.04 c1.32,3.626,4.798,6.063,8.654,6.063c1.07,0,2.13-0.188,3.147-0.559c2.308-0.841,4.15-2.531,5.191-4.764 c1.04-2.23,1.15-4.73,0.312-7.037C70.651,81.083,67.172,78.646,63.316,78.646z"></path>
                                <path d="M39.903,78.757c-1.074-0.39-2.188-0.588-3.31-0.588c-4.054,0-7.71,2.562-9.097,6.375 c-0.886,2.431-0.771,5.06,0.322,7.403c1.092,2.344,3.031,4.121,5.462,5.006c1.072,0.391,2.187,0.587,3.312,0.587 c4.056,0,7.711-2.562,9.097-6.372c0.884-2.426,0.768-5.055-0.326-7.4C44.268,81.42,42.33,79.641,39.903,78.757z"></path>
                                <path d="M24.916,65.6c-1.81-3.133-5.183-5.078-8.805-5.078c-1.771,0-3.522,0.472-5.067,1.361c-2.35,1.357-4.03,3.549-4.731,6.166 c-0.703,2.62-0.343,5.357,1.014,7.706c1.81,3.134,5.184,5.08,8.806,5.08c1.77,0,3.521-0.472,5.065-1.362 C26.046,76.674,27.714,70.45,24.916,65.6z"></path>
                                <path d="M11.495,54.991c5.158,0,9.555-3.695,10.453-8.786c0.492-2.797-0.133-5.617-1.762-7.94 c-1.627-2.326-4.063-3.878-6.861-4.372c-0.62-0.108-1.247-0.163-1.86-0.163c-5.158,0-9.555,3.694-10.453,8.785 C0.52,45.31,1.145,48.13,2.774,50.456c1.628,2.325,4.065,3.878,6.861,4.371C10.252,54.936,10.878,54.991,11.495,54.991z"></path>
                                <path d="M24.849,32.319c2.599,0,5.131-0.923,7.13-2.598c2.268-1.903,3.659-4.58,3.918-7.538c0.259-2.958-0.647-5.836-2.551-8.104 c-2.114-2.52-5.217-3.965-8.511-3.965c-2.603,0-5.135,0.922-7.131,2.597c-2.271,1.906-3.665,4.583-3.923,7.537 c-0.259,2.952,0.648,5.831,2.555,8.104C18.453,30.873,21.555,32.319,24.849,32.319z"></path>
                            </g>
                            <circle cx="49.955" cy="12.076" r="12.076"></circle>
                        </g>
                    </g>
                </g>
            </svg>
        `,

        down: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"></path>
                </g>
            </svg>
        `,

        up: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="${fill}"></path>
                </g>
            </svg>
        `,

        user: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <circle cx="11" cy="6" r="4" stroke="${stroke}" stroke-width="2"></circle>
                    <path d="M17 10.3C17.5207 10.7686 17.8126 11.0314 18.3333 11.5L21 8.5" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M18.9975 18C19 17.8358 19 17.669 19 17.5C19 15.0147 15.4183 13 11 13C6.58172 13 3 15.0147 3 17.5C3 19.9853 3 22 11 22C13.231 22 14.8398 21.8433 16 21.5634" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
        `,

        cloud: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M22 14.3529C22 17.4717 19.4416 20 16.2857 20H11M14.381 9.02721C14.9767 8.81911 15.6178 8.70588 16.2857 8.70588C16.9404 8.70588 17.5693 8.81468 18.1551 9.01498M7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H7M7.11616 11.6089C6.88706 10.9978 6.7619 10.3369 6.7619 9.64706C6.7619 6.52827 9.32028 4 12.4762 4C15.4159 4 17.8371 6.19371 18.1551 9.01498M7.11616 11.6089C7.68059 11.7184 8.20528 11.9374 8.66667 12.2426M18.1551 9.01498C18.8381 9.24853 19.4623 9.60648 20 10.0614" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
        `,

        notCloud: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M22 13.3529C22 16.0599 20.0726 18.3221 17.5 18.8722M6.28571 19C3.91878 19 2 17.1038 2 14.7647C2 12.4256 3.91878 10.5294 6.28571 10.5294C6.56983 10.5294 6.8475 10.5567 7.11616 10.6089M14.381 8.02721C14.9767 7.81911 15.6178 7.70588 16.2857 7.70588C16.9404 7.70588 17.5693 7.81468 18.1551 8.01498M7.11616 10.6089C6.88706 9.9978 6.7619 9.33687 6.7619 8.64706C6.7619 5.52827 9.32028 3 12.4762 3C15.4159 3 17.8371 5.19371 18.1551 8.01498M7.11616 10.6089C7.68059 10.7184 8.20528 10.9374 8.66667 11.2426M18.1551 8.01498C18.8381 8.24853 19.4623 8.60648 20 9.06141" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M13.5 17.5L12 19M12 19L10.5 20.5M12 19L10.5 17.5M12 19L13.5 20.5" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
        `,

        version: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M11 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11M22 11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2.51839 4.82475 2.22937 5.69989 2.10149 7" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M13 17C13 15.1144 13 14.1716 13.5858 13.5858C14.1716 13 15.1144 13 17 13H18C19.8856 13 20.8284 13 21.4142 13.5858C22 14.1716 22 15.1144 22 17C22 18.8856 22 19.8284 21.4142 20.4142C20.8284 21 19.8856 21 18 21H17C15.1144 21 14.1716 21 13.5858 20.4142C13 19.8284 13 18.8856 13 17Z" stroke="${stroke}" stroke-width="2"></path>
                </g>
            </svg>
        `,

        info: `
            <svg id="${id}" class="${classes}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M12 17V11" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path> 
                    <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="${stroke}"></circle> 
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path> 
                </g>
            </svg>
        `
    }
};

export const icon = {
    sunDark: `<i class="fa-solid fa-sun"></i>`,
    sunLight: `<i class="fa-regular fa-sun"></i>`,
    dollar: `<i class="fa-solid fa-dollar-sign"></i>`,
    visa: `<i class="fa-brands fa-cc-visa"></i>`,
    mastercard: `<i class="fa-brands fa-cc-mastercard"></i>`,
    cash: `<i class="fa-solid fa-hryvnia-sign"></i>`,
    logout: `<i class="fa-solid fa-right-from-bracket"></i>`,
    plus: `<i class="fa-solid fa-plus"></i>`,
    minus: `<i class="fa-solid fa-minus"></i>`,
    transaction: `<i class="fa-solid fa-money-bill-transfer"></i>`,
    card: `<i class="fa-regular fa-credit-card"></i>`,
    receipt: `<i class="fa-solid fa-receipt"></i>`,
    user: `<i class="fa-solid fa-user"></i>`,
    settings: `<i class="fa-solid fa-sliders"></i>`,
    home: `<i class="fa-solid fa-house"></i>`
}
