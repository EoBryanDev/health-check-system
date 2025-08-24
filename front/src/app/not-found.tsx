import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página Não Encontrada</h2>
      <p>A página que você está procurando não existe.</p>
      <p>
        <Link href="/">Voltar para a página inicial</Link>
      </p>
    </div>
  );
}