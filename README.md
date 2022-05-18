# Welcome to glivera-webpack-boilerplate
## Get started

1. Install [node.js](https://nodejs.org/)

2. Install npm packages

`npm i` or `npm ci`

3. Let's code!

* `npm run dev` -  File watching + server
* `npm run dev-build` - Build (development mode) + file watching
* `npm run build` - Build (production mode)
* `npm run wp_build` - Copies the files (css/js/fonts/static) to wp_theme directory


## Template structure

```
build                        # Production build
helpers                      # All type samples and plugins
├── components               # Samples
├── components_vanilla       # Vanilla js helpers
settings                     # Webpack configs
src                          # Sources
├── fonts                    # Fonts template
│   ├── icons                # Iconfont template
├── images                   # Images template
│   ├── icons                # Icons template
│   |   ├── other_icons      # Icons unused in sprite
│   |   ├── sprite_icons     # Icons used in sprite
├── js                       # Scripts template
│   ├── components           # Functions for components
│   ├── dev_vendors          # Functions for develop, unused in production
│   ├── libs                 # Libriaries, plugins template
│   ├── utils                # Constants, helpers functions
├── pug                      # Layout templates
│   ├── blocks               # Layout of components
│   │   ├── universal        # Layout of universal components
│   ├── layout               # Page layout
│   ├── pages                # Page templates
│   ├── templates            # Base mixins, data arrays and variables for *.pug
│   │   ├── mixins           # Mixins used in project
├── scss                     # Styles template
│   ├── base_ui              # Styles for base elements
│   │   ├── forms            # Styles for form elements
│   ├── blocks               # Styles for all components
│   │   ├── universal        # Styles for universal components
│   ├── helpers              # Style extends, mixins and variables
│   │   ├── extends          # Extends for all components
│   │   │   ├── forms        # Extends for forms
│   │   │   ├── typography   # Extends for typography
│   ├── plugins              # Styles for plugins
│   ├── static               # Static files
.env                         # Environment configuration
.babelrc                     # Babel configuration
.editorconfig                # Configuring code editor settings
.gitignore                   # List of excluded files from Git
.eslintrc                    # Eslint rules
.sasslintrc                  # Sasslint rules
postcss.config.js            # Configuration of CSS post-processing
webpack.config.js            # Configuration for launching webpack tasks
package.json                 # List of modules and other information
readme.md                    # Documentation template
```

## Rules:

**File naming:**

| Type                          | Naming                | Exuals to           |
| ----------------------------  | :--------------------:| -------------------:|
| Pug files                     | your_file.pug         |                     |
| Pug files (built-in blocks)   | _your_file.pug        |                     |
| Sass files                    | _your_file.scss       |                     |
| Pug mixin (pug/templates)     | _m_your_component.pug | *name of component* |
| JS component (js/components)  | nameOfYourFunction.js | *name of function*  |

