# Dialog component

>>A dialog is a small application window that sits above the application and is designed to interrupt the current processing of an application in order to prompt the user to enter information or require a response (dialog).

—[WAI-ARIA 1.0 Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#dialog_nonmodal)

This component has been created in accordance with the **Dialog** design pattern found in the [WAI-ARIA 1.0 Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#dialog_nonmodal) document. Full specs here:

* [Dialog Non-Modal](https://www.w3.org/TR/wai-aria-practices/#dialog_nonmodal)

  >>A non-modal dialog is one which is displayed and focusable at the same time as the application which invoked it. Also like the modal dialog, focus via the tab and shift-tab key must be maintained within the dialog. However, a non-modal dialog should have a keyboard mechanism to return focus to the application while leaving the dialog open.
* [Dialog Modal](https://www.w3.org/TR/wai-aria-practices/#modal_dialog)

  >>A modal dialog is a dialog that takes and holds focus until the dialog is closed or submitted. A specific kind of modal dialog is the alertdialog, that is used to convey a short message to the user. See the "Alert Dialog" design pattern.

## Install

## Progressive Enhancement features

## Demo

## TODO

* Add all ARIA, including the **Alert Dialog** pattern.
* Disable vertical scroll on the `<body>` element?
* Only 1 to be open at a time?
* Add a CSS file to the component and package it up with Webpack.
* Investigate if the `<dialog>` element is ready.
