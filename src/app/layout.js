import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Book Hunt",
  description: "Um aplicativo moderno de busca de livros que utiliza a API do Google Books. Permite aos usuários pesquisar, visualizar detalhes e favoritar livros.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
