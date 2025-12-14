import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function categorizeTransaction(description: string): string {
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes('กาแฟ') || lowerDesc.includes('ข้าว') || lowerDesc.includes('ส้มตำ') || lowerDesc.includes('อาหาร')) {
    return 'อาหาร';
  }
  if (lowerDesc.includes('น้ำมัน') || lowerDesc.includes('เดินทาง')) {
    return 'เดินทาง';
  }
  if (lowerDesc.includes('เสื้อยืด') || lowerDesc.includes('ช้อปปิ้ง') || lowerDesc.includes('uniqlo')) {
    return 'ช้อปปิ้ง';
  }
  if (lowerDesc.includes('ไฟฟ้า') || lowerDesc.includes('สาธารณูปโภค')) {
    return 'สาธารณูปโภค';
  }
  if (lowerDesc.includes('netflix') || lowerDesc.includes('บันเทิง')) {
    return 'บันเทิง';
  }
  if (lowerDesc.includes('ยา') || lowerDesc.includes('หมอ') || lowerDesc.includes('สุขภาพ')) {
    return 'สุขภาพ';
  }
  if (lowerDesc.includes('เงินเดือน') || lowerDesc.includes('ขายของ')) {
    return 'รายได้';
  }
  return 'อื่นๆ';
}
