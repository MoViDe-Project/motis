{
  description = "A specialized devshell for Svelte + TailwindCSS";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-24.11";

    nixNeovim =  {
      url = "github:D3vZro/NixNeovim";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, nixNeovim,... }:
  let
    system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    nvim = nixNeovim.outputs.packages.${system}.svelte;
  in {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          # Editor
          nvim
          svelte-language-server
          tailwindcss-language-server
          typescript-language-server

          # Utils
          hexedit

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
