import React from 'react';

export const onRenderBody = ({ getPostBodyComponents, setPostBodyComponents }, pluginOptions) => {
    setPostBodyComponents([<script defer key="wasm-script" src="../../wasm_exec.js" />]);
}
  