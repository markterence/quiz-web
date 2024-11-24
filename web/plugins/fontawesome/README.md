# Fontawesome

## Importing icons

Here's an example that adds the Solid style User Secret icon to the library:

```js
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
```

Importing icons from different styles/variants: 

```js
/* import icon from solid variant and prefix with `fas` */
import { faCoffee as fasCoffee } from '@fortawesome/pro-solid-svg-icons'

/* import icon from regular variant and prefix with `far` */
import { faCoffee as farCoffee } from '@fortawesome/pro-regular-svg-icons'

/* add icon to the library */
library.add(fasCoffee, farCoffee)
```

Then call the icon in the component:

```html
<!-- Add Icons using String format -->
<font-awesome-icon icon="fa-solid fa-coffee" />
<font-awesome-icon icon="fa-regular fa-coffee" />

<!-- Add Icons using Array format -->
<font-awesome-icon :icon="['fas', 'coffee']" />
<font-awesome-icon :icon="['far', 'coffee']" />
```

## Calling the Icons

Add the style and icon you want using the String format:

```html
<FontAwesomeIcon icon="fa-solid fa-user-secret" />
```

Add the style and icon you want using the Array format:

```html
<FontAwesomeIcon :icon="['fas', 'user-secret']" />
```

**Note**: You add the icons in camelCase, then use kebab-case in the template.
