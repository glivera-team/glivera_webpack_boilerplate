# Welcome to glivera-webpack-boilerplate

## Get started

1. Install [node.js](https://nodejs.org/)

2. Install npm packages

`npm i` or `npm ci`

3. Let's code!

- `npm run dev` - File watching + server
- `npm run dev-build` - Build (development mode) + file watching
- `npm run build` - Build (production mode)
- `npm run build-preview` - Build + dev widget (production mode)
- `npm run wp-build` - Copies the files (css/js/fonts/static) to wp_theme directory

## Template structure

```
build                        # Production build
dist                         # Dev build
public                       # Production WP build
helpers                      # All type samples and plugins
├── components               # Samples
├── components_vanilla       # Vanilla js helpers
settings                     # Webpack configs
src                          # Sources
├── fonts                    # Fonts template
│   ├── icons                # Iconfont template
├── images                   # Images template
│   ├── icons                # Icons template
│   |   ├── other-icons      # Icons unused in sprite
│   |   ├── sprite-icons     # Icons used in sprite
├── js                       # Scripts template
│   ├── components           # JS-components
│   ├── dev-vendors          # Functions for develop, unused in production
│   ├── layout               # Layout function for init global JS-components or Critical scripts
│   ├── pages                # JS-pages for init specific components
│   ├── utils                # Constants, helpers functions
│   ├── vendors              # Libriaries, plugins template
│   ├── app.js             	 # Global layout combining layout and page scripts
├── pug                      # Layout templates
│   ├── blocks               # Layout of components
│   │   ├── universal        # Layout of universal components
│   ├── layout               # Page layout
│   ├── pages                # Page templates
│   ├── templates            # Base mixins, data arrays and variables for *.pug
│   │   ├── mixins           # Mixins used in project
├── scss                     # Styles template
│   ├── base                 # Styles for base elements, resets, fonts
│   ├── components           # Styles for components
│   │   ├── universal        # Styles for universal components
│   ├── critical             # Critical components
│   ├── helpers              # Style extends, mixins and variables
│   │   ├── mixins           # Specific mixins
│   │   │   ├── forms        # Mixins for forms
│   │   │   ├── typography   # Mixins for typography
│   ├── layout             	 # Styles for layout components(header, footer, etc)
│   ├── ui                   # Styles for global ui(forms, buttons, icons)
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
Kebab-case for all files - foo-bar-baz.ex
For pug mixins - m-foo-bar-baz.pug

#
