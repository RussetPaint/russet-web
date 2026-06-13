{
  description = "";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowDeprecatedx86_64Darwin = true;
        };
      in {
        devShells.default = pkgs.mkShell {

          packages = with pkgs; [
            nodejs_24
            typescript

            prettier
          ];

          NODE_ENV = "development";

          shellHook = ''
            echo "Nix Develop works!"
          '';
        };
      });
}
