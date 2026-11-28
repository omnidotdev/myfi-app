# @omnidotdev/myfi-app

## 0.1.0

### Minor Changes

- [#20](https://github.com/omnidotdev/myfi-app/pull/20) [`f2ca602`](https://github.com/omnidotdev/myfi-app/commit/f2ca6020bb08493f4d239059e446335b47bb3f6c) Thanks [@coopbri](https://github.com/coopbri)! - When a workspace needs Omni credits to use AI categorization, the suggestion prompt now explains that and offers Buy credits and Upgrade links for the workspace. The Upgrade link now opens the Pro plan for the current workspace.

- [#36](https://github.com/omnidotdev/myfi-app/pull/36) [`e72dd66`](https://github.com/omnidotdev/myfi-app/commit/e72dd66957a4958f8dc7ce3f0efedb48a8d4d400) Thanks [@coopbri](https://github.com/coopbri)! - Signing in or out of Omni in another app now carries over here

- [#35](https://github.com/omnidotdev/myfi-app/pull/35) [`60295f2`](https://github.com/omnidotdev/myfi-app/commit/60295f2a04c8e45c0fd46c1b70a854b53651dc9c) Thanks [@coopbri](https://github.com/coopbri)! - The account menu lists the other Omni accounts signed in on your browser, so switching to one takes a single click. When more than one account is signed in, Sign out ends only the account you use in MyFi, and a new Sign out of all accounts entry ends every one. Links to your Omni account, workspaces, and AI billing now open it as the same account you use in MyFi

- [#34](https://github.com/omnidotdev/myfi-app/pull/34) [`c8326e5`](https://github.com/omnidotdev/myfi-app/commit/c8326e5df5ef1564c0e97dd68a9668b598f8649c) Thanks [@coopbri](https://github.com/coopbri)! - The account menu now has a Switch account option, just above Sign out. It opens the Omni account picker so you can move to another account signed in on this device, or sign in to a different one, and brings you back to the page you were on. Cancelling keeps you signed in as you are.

### Patch Changes

- [`d0070e2`](https://github.com/omnidotdev/myfi-app/commit/d0070e27a355946ebb1cc9cd164d2434a5454b73) Thanks [@coopbri](https://github.com/coopbri)! - Hide the Gusto payroll connect button and the landing page's bank-feeds mention until those integrations are provisioned in production. Payroll and transaction CSV import stay available.

- [#23](https://github.com/omnidotdev/myfi-app/pull/23) [`71c87f8`](https://github.com/omnidotdev/myfi-app/commit/71c87f874169f8d3dabe042129d604f1eae06647) Thanks [@coopbri](https://github.com/coopbri)! - Dropdowns now match the rest of the interface, and tag pickers open a styled list instead of a native multi-select box.

- [#21](https://github.com/omnidotdev/myfi-app/pull/21) [`33c05f7`](https://github.com/omnidotdev/myfi-app/commit/33c05f7bb938212df978ea7f9a1d0f2eb14ad992) Thanks [@coopbri](https://github.com/coopbri)! - Stop writing users' email addresses to the logs: a failed sign-in token check logs only the error message, not the user's email and name, by moving to `@omnidotdev/providers` v0.2.0.

- [#18](https://github.com/omnidotdev/myfi-app/pull/18) [`a63e341`](https://github.com/omnidotdev/myfi-app/commit/a63e341a3512ae7fc474b8d4ee27fa32c051d8d1) Thanks [@coopbri](https://github.com/coopbri)! - Fix pages failing to load (HTTP 431) for accounts that belong to many workspaces

- [#32](https://github.com/omnidotdev/myfi-app/pull/32) [`7751c18`](https://github.com/omnidotdev/myfi-app/commit/7751c185e5f1c98f157cedb7ba2b8528ce53968a) Thanks [@coopbri](https://github.com/coopbri)! - Sign-in session data sent to the browser no longer includes the session token

- [#19](https://github.com/omnidotdev/myfi-app/pull/19) [`ce02d33`](https://github.com/omnidotdev/myfi-app/commit/ce02d3374f833740e432939c6d0664c05887c05d) Thanks [@coopbri](https://github.com/coopbri)! - Removed the Audit Log settings page, which could not load any activity. It will return once workspace activity is recorded and available to view.

- [#29](https://github.com/omnidotdev/myfi-app/pull/29) [`f64f51d`](https://github.com/omnidotdev/myfi-app/commit/f64f51d5bb9a50e6cf93f3b76d58817d3dcf4c30) Thanks [@coopbri](https://github.com/coopbri)! - Fonts are now served from MyFi itself instead of Google Fonts, so loading the app no longer sends your IP address to Google.

- [#33](https://github.com/omnidotdev/myfi-app/pull/33) [`4fe669d`](https://github.com/omnidotdev/myfi-app/commit/4fe669d072032e209b58e1957f1766033330df9b) Thanks [@coopbri](https://github.com/coopbri)! - Your sign-in token now stays out of reach of scripts running on the page, so the session read from the browser no longer carries it

- [`b6eba87`](https://github.com/omnidotdev/myfi-app/commit/b6eba879fece82fe75f6fad2200a649859ab237a) Thanks [@coopbri](https://github.com/coopbri)! - Use Omni's central Privacy Policy and Terms of Service. The footer links to omni.dev/legal, and the old `/privacy` and `/terms` paths permanently redirect there, replacing MyFi's own policy pages.

- [#22](https://github.com/omnidotdev/myfi-app/pull/22) [`a910ef2`](https://github.com/omnidotdev/myfi-app/commit/a910ef2902d2de3014771b9e598797b8d92729cb) Thanks [@coopbri](https://github.com/coopbri)! - The workspace switcher now shows each workspace's `@handle` under its name, and its "Manage workspaces" link can be reached with the keyboard.

- [#25](https://github.com/omnidotdev/myfi-app/pull/25) [`53d63c0`](https://github.com/omnidotdev/myfi-app/commit/53d63c0b55750e6a4ab62f891158d63916796edd) Thanks [@coopbri](https://github.com/coopbri)! - The workspace menu in the sidebar now scrolls when you belong to many workspaces, and opens at the same width as the switcher.
