<div align="center">
  <img width="100%" height="auto" alt="addreth" src="https://github.com/bpierre/blo/assets/36158/8f4b0ac6-142a-4b2e-b55d-b6a033f0fb59">
</div>

## What It Does

- 👁 Display addresses in a compact way, while retaining the ability to see them in full.
- 📋 Copy the address to the clipboard with a single click.
- 👉 Check the address on the block explorer of your choice.
- 🏷 **ENS resolution** works out of the box if [wagmi](https://wagmi.sh/) is present.
- 🌈 **Six themes** to choose from or to customize as desired.
- 🎹 **Accessible**: keyboard navigation and focus states work as expected.
- 💆‍♀️ **Zero configuration**: just import and drop `<Addreth />` in your app.
- 🪚 **Customizable**: change the global configuration with `<AddrethConfig />` (optional).
- 📦 Small: **[5.05 kB](https://bundlejs.com/?bundle&q=addreth&treeshake=%5B%7B+Addreth+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%2C%22wagmi%22%5D%7D%7D)**, styles and themes included, and no external dependencies.

## How It Looks

<div align="center">
  
![With ENS name resolution](https://github.com/bpierre/blo/assets/36158/9a650577-88ff-4728-8c2e-ff69ead4dd17)
![Without ENS name resolution](https://github.com/bpierre/blo/assets/36158/75066867-2759-431c-bade-26807a300e70)
![Popup](https://github.com/bpierre/blo/assets/36158/e8539d4e-fb53-4dc5-8ccc-81f14abc0bc7)

<h3>Design by <a href="https://twitter.com/dizzypaty">Paty Davila</a></h3>

</div>

## Installation

```sh
npm i -S addreth
pnpm add addreth
yarn add addreth
```

## Getting Started

Import `Addreth` and add it to your app:

```tsx
import { Addreth } from "addreth";

function App() {
  return (
    <main>
      <Addreth address="0x…" />
    </main>
  );
}
```

From this point, you could check out the [demo page](https://addreth.vercel.app/) to see various examples of what can be done with the component, or consult the API documentation below.

## API

### &lt;Addreth />

The `<Addreth />` component only requires the `address` prop to be set. It will display the address in a compact way while provide a convenient set of features. Multiple props are available to customize it in different ways:

<details>
<summary><b><code>address</code></b></summary>
<br>

The `address` prop is the only required prop, and it must be a valid Ethereum address.

```tsx
<Addreth address="0x0000000000000000000000000000000000000000" />;
```

</details>

<details>
<summary><b><code>actions</code></b></summary>
<br>

The `actions` prop allows to control the action buttons inside the badge. It can be set to `"all"` (default), `"copy"`, `"explorer"` or `"none"`.

```tsx
// Display the copy button only.
// The block explorer button will still appear on the popup.
<Addreth address="0x…" actions="copy" />;
```

</details>

<details>
<summary><b><code>ens</code></b></summary>
<br>

The `ens` prop allows to control whether to use the ENS name resolution, and it is enabled by default.

This is an alias for `icon="identicon"` and `label="address"`.

```tsx
<Addreth address="0x…" ens={false} />;
```

</details>

<details>
<summary><b><code>explorer</code></b></summary>
<br>

The `explorer` prop allows to generate the name and URL of a given block explorer (e.g. Etherscan).

```tsx
<Addreth
  address="0x…"
  explorer={(address) => ({
    name: "Base",
    url: `https://basescan.com/address/${address}`,
  })}
```

</details>

<details>
<summary><b><code>font</code> and <code>fontMono</code></b></summary>
<br>

The `font` and `fontMono` props allow to control the font names used for the badge and buttons. If `fontMono` is specified, it will be applied to the address specifically. If neither `font` nor `fontMono` are specified, the fonts will be inherited from the web page.

```tsx
// Use the same font for the address and buttons
<Addreth address="0x…" font="Anonymous Pro" />;
```

</details>

<details>
<summary><b><code>icon</code></b></summary>
<br>

The `icon` prop allows to control the icon displayed in the badge. It can be set to `"ens"` (default), `"identicon"`, `false` or `null`.

- If set to `"ens"` and the app uses [wagmi](https://wagmi.sh/), the ENS avatar corresponding to the address, if it exists, will be displayed. Otherwise, the icon will fallback to `"identicon"`.
- If set to `"identicon"`, the [identicon](https://github.com/bpierre/blo) corresponding to the address will be displayed.
- If set to `false` or `null`, no icon will be displayed.
- If set to a function, it will be called with the address as argument and must return either React element to replace the icon entirely, or a string to provide an image URL.

```tsx
// Display the ENS avatar if available, otherwise display the identicon.
<Addreth address="0x…" icon="ens" />;

// Always display the identicon.
<Addreth address="0x…" icon="identicon" />;

// Do not display any icon.
<Addreth address="0x…" icon={false} />;

// Custom icon with a URL.
<Addreth
  address="0x…"
  icon={(address) => `https://example.com/identicon/${address}.svg`}
/>;

// Custom icon with a React element.
<Addreth
  address="0x…"
  icon={(address) => (
    <img src={`https://example.com/identicon/${address}.svg`} />
  )}
/>;
```

</details>

<details>
<summary><b><code>label</code></b></summary>
<br>

The `label` prop allows to control the label displayed in the badge. It can be set to `"ens"` (default), `"address"` or a function.

- If set to `"ens"` and the app uses [wagmi](https://wagmi.sh/), the ENS name corresponding to the address, if it exists, will be displayed. Otherwise, the label will fallback to `"address"`.
- If set to `"address"`, the address will be displayed, shortened to `shortenAddress` characters on each side (4 by default).
- If set to a function, it will be called with the address as argument and must return a React node.

```tsx
// Display the ENS name if available.
<Addreth address="0x…" label="ens" />;

// Always display the address.
<Addreth address="0x…" label="address" />;

// Custom label.
<Addreth
  address="0x…"
  label={(address) => <b>{address}</b>}
/>;
```

</details>

<details>
<summary><b><code>maxWidth</code></b></summary>
<br>

The `maxWidth` prop allows to control the maximum width of the badge. If not specified, the badge will adapt to its parent width.

```tsx
// Limit the badge width to 200px.
<Addreth address="0x…" maxWidth={200} />;
```

</details>

<details>
<summary><b><code>popupNode</code></b></summary>
<br>

The `popupNode` prop allows to control the node used to render the popup. It defaults to `document.body`.

</details>

<details>
<summary><b><code>shortenAddress</code></b></summary>
<br>

The `shortenAddress` prop allows to control the number of first and last characters to show for the address. It defaults to `4`. Set it to `false` to display the full address.

```tsx
// Display the first and last 6 characters of the address.
<Addreth address="0x…" shortenAddress={6} />;
```

</details>

<details>
<summary><b><code>stylesId</code></b></summary>
<br>

The `stylesId` prop allows to control the ID attribute of the style element used to inject the CSS in the page. It defaults to `"addreth-styles"`.

</details>

<details>
<summary><b><code>theme</code></b></summary>
<br>

The `theme` prop allows to control the theme used for the badge and buttons. It can be set to one of the provided themes, or used to define a custom theme.

Available themes:

- `light` (default)
- `dark`
- `unified-light`
- `unified-dark`
- `simple-light`
- `simple-dark`

You can also define a custom theme by passing an object. If `base` is provided, it will extend from that theme. Otherwise, it will extend the default theme (`light`), or the parent one if provided (see `AddrethConfig` to check how to define a parent config).

```tsx
type ThemeDeclaration = {
  base?: ThemeName; // the theme to extend from

  // general
  textColor?: Color; // text color of the button and popup
  secondaryColor?: Color; // color of icons
  focusColor?: Color; // color of the focus ring
  fontSize?: number; // font size used everywhere

  // badge
  badgeBackground?: Color; // background color for the badge
  badgeRadius?: number; // radius used for the badge (if badgeGap is 0) or for individual buttons
  badgeIconRadius?: number; // radius for the badge icon (defaults to badgeRadius if not set)
  badgeGap?: number; // gap between badge itemstype
  badgeHeight?: number; // height of the badge
  badgePadding?: number; // inner padding of the badge
  badgeLabelPadding?: number; // padding inside the badge label

  // popup
  popupBackground?: Color; // background color of the popup
  popupRadius?: number; // radius of the popup
  popupShadow?: string; // shadow of the popup
};
```

See [theme.ts](./src/theme.ts) for more details.

</details>

<details>
<summary><b><code>underline</code></b></summary>
<br>

Display the label underlined.

```tsx
<Addreth address="0x…" underline />;
```

</details>

<details>
<summary><b><code>uppercase</code></b></summary>
<br>

Display the label in uppercase.

```tsx
<Addreth address="0x…" uppercase />;
```

</details>

### &lt;AddrethConfig />

Having to wrap `<Addreth />` in order to provide your desired default configuration can be tedious, which is why `<AddrethConfig />` is provided. It allows to customize the default configuration of `<Addreth />` and support the same props, except `address`.

```tsx
import { Addreth, AddrethConfig } from "addreth";

function App() {
  return (
    <AddrethConfig font="Anonymous Pro" theme="dark">
      <Addreth address="0x…" />
    </AddrethConfig>
  );
}
```

## FAQ

### Is it SSR-friendly?

The component won’t cause any issue in SSR environments, however it will only render after the styles have been injected into the page.

### Does it work with Ethers.js or other Ethereum libraries?

You can wrap the component and set `icon` and `label` to anything you want, including ENS name and avatar coming from another library.

### I am not using wagmi, but Next.js says it cannot resolve the dependency.

Next.js tries to resolve all imports including when using [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) which addreth uses to detect the presence of [wagmi](https://wagmi.sh/). A solution is to tell Next.js to ignore this dependency by adding this to your next.config.js:

```js
webpack(conf) {
  conf.resolve.fallback = { wagmi: false };
  return conf;
}
```

## License

[MIT](./LICENSE)
