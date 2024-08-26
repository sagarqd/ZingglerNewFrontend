import { width } from "@mui/system";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const ColorTablet = () => {
  const { unityProvider, loadingProgression } = useUnityContext({
    loaderUrl: "build/webgl/ExportWebGl.loader.js",
    dataUrl: "build/webgl/ExportWebGl.data.unityweb",
    frameworkUrl: "build/webgl/ExportWebGl.framework.js.unityweb",
    codeUrl: "build/webgl/ExportWebGl.wasm.unityweb",
  });

  return (
    <div>
      {loadingProgression !== 1 && (
        <h1>Loading... {Math.round(loadingProgression * 100)} %</h1>
      )}
      <Unity unityProvider={unityProvider} style={{width: '100%', height: '100vh'}}/>
    </div>
  );
};

export default ColorTablet;
