{
  description = "Asteroids game dev shell: bitecs + pixi.js (WebGL) + TypeScript + Vite";

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
          # Пакеты, доступные в среде разработки
          packages = with pkgs; [
            nodejs_24
            typescript
          ];

          # Переменные окружения для настройки
          NODE_ENV = "development";

          # Сообщение, которое выводится при входе в окружение
          shellHook = ''
            echo "Nix Develop работает."
          '';
        };
      });
}
