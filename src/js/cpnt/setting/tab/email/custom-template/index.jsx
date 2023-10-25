import React, { lazy } from "react";
const NewTemplate = lazy(()=>import('./new-template'));
const SavedTemplates = lazy(()=>import('./saved-templates'))

export default function CustomTemplate() {
  return <div>
    <NewTemplate />
    <SavedTemplates />
  </div>;
}
