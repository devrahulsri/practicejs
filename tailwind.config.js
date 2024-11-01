// tailwind.config.js
const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utilities/**/*.{js,ts,jsx,tsx,mdx}', 
    './src/**/*.{js,ts,jsx,tsx,mdx}',  
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1536px',
        },
        ':root': {
          color: 'theme(colors.darkblue)',
          fontFamily: 'theme(fontFamily.nunito)',
        },
      });
    },
    nextui(),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '4.8951%',
        sm: '4.8951%',
        md: '6.42202%',
        lg: '4.77816%',
        xl: '4.77816%',
        '2xl': '72.425px',
      },
    },
    colors: {
      krollblue: '#14487F',
      green: '#43B049',
      darkblue: '#001424',
      purssianblue: '#003057',
      skyblue: '#4C9FC8',
      softcyan: '#67D2DF',
      oceanblue: '#EEF9FC',
      grey: '#A7A8A9',
      limegreen: '#C4D600',
      punch: '#E2665C',
      darkgrey: '#DBDBDC',
      krollShadow:'#949494',
      black: '#000',
      white: '#fff',
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      initial: 'initial'
    },
    extend: {
      order: Object.fromEntries(Array.from({ length: 100 }, (_, i) => [i + 1, i + 1])),
     
      fontFamily: {
        nunito: 'nunito-sans, sans-serif',
        roboto: 'roboto-mono, monospace',
      },
      fontSize: {
        42: '2.625rem',
        13: '0.8125rem',
        14: '0.875rem',
        22: '1.375rem',
        28: '1.75rem',
        40: '2.5rem',
        32: '2rem',   
        9:'0.562rem',
        12: '3rem'        
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.darkblue'),
            fontFamily: theme('fontFamily.nunito'),
            fontWeight: '300',
            a: {
              color: theme('colors.darkblue'),
              borderBottomWidth: '1px',
              borderBottomStyle: 'dotted',
              borderBottomColor: 'currentcolor',
              textDecoration: 'none',
              fontWeight: 300,
              '&:hover': {
                color: theme('colors.darkblue'),
                borderBottomStyle: 'solid',
              },
            },
            h1: {
              color: theme('colors.darkblue'),
              fontWeight: 800,
              a: {
                fontWeight: 800,
              }
            },
            h2: {
              color: theme('colors.darkblue'),
              fontWeight: 700,
              a: {
                fontWeight: 700,
              }
            },
            h3: {
              color: theme('colors.darkblue'),
              fontWeight: 700,
              a: {
                fontWeight: 700,
              }
            },
            h4: {
              color: theme('colors.darkblue'),
              fontWeight: 700,
              a: {
                fontWeight: 700,
              }
            },
            h5: {
              color: theme('colors.darkblue'),
              fontWeight: 700,
              a: {
                fontWeight: 700,
              }
            },
            h6: {
              color: theme('colors.darkblue'),
              fontWeight: 700,
              a: {
                fontWeight: 700,
              }
            },
            p: {
              fontWeight: 300,
            },
            strong: {
              fontWeight: 700,
              color: theme('colors.darkblue'),
            },
            'li::marker': {
              color: theme('colors.darkblue'),
            },
            blockquote: {
              color: "currentColor"
            }
          },
        },
        white: {
          css: {
            color: theme('colors.white'),
            fontFamily: theme('fontFamily.nunito'),
            fontWeight: '300',
            a: {
              color: theme('colors.white'),
              borderBottomWidth: '1px',
              borderBottomStyle: 'dotted',
              borderBottomColor: theme('colors.white'),
              textDecoration: 'none',
              fontWeight: 300,
              '&:hover': {
                color: theme('colors.white'),
                borderBottomStyle: 'solid',
              },
            },
            h1: {
              color: theme('colors.white'),
              fontWeight: 800,
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: 700,
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: 700,
            },
            h4: {
              color: theme('colors.white'),
              fontWeight: 700,
            },
            h5: {
              color: theme('colors.white'),
              fontWeight: 700,
            },
            h6: {
              color: theme('colors.white'),
              fontWeight: 700,
            },
            div: {
              color: theme('colors.white'),
            },
            p: {
              fontWeight: 300,
            },
            strong: {
              fontWeight: 700,
              color: theme('colors.white'),
            },
            'li::marker': {
              color: theme('colors.white'),
            },
            blockquote: {
              color: "currentColor"
            }
          },
        },
      }),
      backgroundImage: {
        basehero: 'url(/images/bg-img.svg)',
        gradiant: 'linear-gradient(90deg,#c4d600 0,#43b049 100%)',
        herogradiant: 'linear-gradient(270deg, #14487F 0%, #4C9FC8 100%)',
        featuregradiant: 'linear-gradient(90deg, #14487F 0%, #4C9FC8 100%)',
        footergradiant: 'linear-gradient(90deg, #43B049 0%, #C4D600 100%)',
        gradiantSecondary: 'linear-gradient(90deg, #43B049 0%, #C4D600 100%)'
      },
      spacing: {
        450: '28.75rem',
        250: '15.625rem',
        240: '15rem',
        220: '13.75rem',
        190: '11.875rem',
        170: '10.625rem',
        500: '31.25rem',
        300: '18.75rem',
        18: '4.5rem',
        15: '3.75rem',
        16: '4rem',
        23: '5.125rem',
        13: '3.25rem',
        100: '25rem',
        25: '6.25rem',
        50: '12.5rem',
        18.75: '4.6875rem',
        21: '5.25rem',
        wide: '8.53242%',        
        gradiant: 'calc(100% + 4.8951vw - 1px)',
        gradiant_md: 'calc(100% + 6.42202vw - 1px)',
        gradiant_lg: '400%',
        tableMaxHeight: 'calc(100vh - 200px)',        
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      maxHeight: (theme) => ({
        ...theme('spacing'),
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
      width: (theme) => ({
        ...theme('spacing'),
      }),
      gridTemplateColumns: {        
        '15': 'repeat(14,1fr) auto;',        
      }
      
    },
  },
  safelist: [
    'bg-krollblue',
    'bg-green',
    'bg-darkblue',
    'bg-purssianblue',
    'bg-skyblue',
    'bg-softcyan',
    'bg-oceanblue',
    'bg-grey',
    'bg-limegreen',
    'bg-punch',
    'border-darkblue',
    'text-darkblue',
    'text-punch',
    'text-limegreen',
    'text-green',
    'text-krollblue',
    'text-oceanblue',
    'text-skyblue',
    'border-white',
    'border-krollblue',
    'border-green',
    'border-darkblue',
    'border-purssianblue',
    'border-skyblue',
    'border-softcyan',
    'border-oceanblue',
    'border-grey',
    'border-limegreen',
    'border-punch',
    'hover:text-darkblue',
    'hover:border-white',
    'hover:border-krollblue',
    'hover:border-green',
    'hover:border-darkblue',
    'hover:border-purssianblue',
    'hover:border-skyblue',
    'hover:border-softcyan',
    'hover:border-oceanblue',
    'hover:border-grey',
    'hover:border-limegreen',
    'hover:border-punch',

    'group-hover:text-darkblue',
    'group-hover:border-white',
    'group-hover:border-krollblue',
    'group-hover:border-green',
    'group-hover:border-darkblue',
    'group-hover:border-purssianblue',
    'group-hover:border-skyblue',
    'group-hover:border-softcyan',
    'group-hover:border-oceanblue',
    'group-hover:border-grey',
    'group-hover:border-limegreen',
    'group-hover:border-punch',

    'group-hover:stroke-darkblue',
    'focus:text-darkblue',
    'stroke-darkblue',
    'fill-darkblue',
    'hover:text-white',

    {
      pattern: /bg-/,
      variants: ['lg', 'hover', 'focus', 'lg:hover', 'border', 'group-hover'],
    },
    {
      pattern: /order-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100)/,
    },
  ],
};
