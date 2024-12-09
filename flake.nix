{
  description = "A specialized devshell for C++ projects";

  inputs = {
    nixpkgs.url = "nixpkgs";
    nixNeovim.url = "github:D3vZro/NixNeovim";
  };

  outputs = { self, nixpkgs, nixNeovim,... }:
  let
    system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    nvim = nixNeovim.outputs.packages.${system}.cpp;
  in {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          # Editor
          nvim

          # Building MOTIS
          cmake
          gcc13
          ninja
          ccache
          libgcc

          # Building Frontend
          nodejs
          vite
        ];
      };
  };
}
