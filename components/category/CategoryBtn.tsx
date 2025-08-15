import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/app/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

interface Props {
  category: Category;
}

const CategoryBtn: React.FC<Props> = ({ category }) => {
  return (
    <Link href={`/categories/${slugify(category.title)}`}>
      <button className="cat-btn">
        <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
          <Image
            src={category.imageUrl || "/placeholder.svg"} // use backend imageUrl if available
            width={30}
            height={30}
            className="object-contain"
            alt={category.title}
          />
        </div>
        <p className="font-semibold text-gray-800 text-[16px]">
          {category.title}
        </p>
      </button>
    </Link>
  );
};

export default CategoryBtn;
