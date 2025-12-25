import Link from "next/link";

export default function OpenPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link href="/qr">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ws88jscyfn.ufs.sh/f/iUXo70XEUowp70Qp4fnAYBTgV2J5MNOWEsxKewFP3l9Rpv1S"
          alt="Ruby"
          className="size-92 cursor-pointer"
        />
      </Link>
    </div>
  );
}
