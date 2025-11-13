import React, { useState, useMemo, useRef } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ItemState {
  id: number;
  price: string;
  quantity: string;
}

const PriceComparisonCalculator: React.FC = () => {
  const nextId = useRef(3);
  const [items, setItems] = useState<ItemState[]>([
    { id: 1, price: '', quantity: '' },
    { id: 2, price: '', quantity: '' },
  ]);

  const calculation = useMemo(() => {
    const itemsWithUnitPrices = items
      .map((item, index) => {
        const price = parseFloat(item.price);
        const quantity = parseFloat(item.quantity);
        if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
          return { ...item, index, unitPrice: null };
        }
        return { ...item, index, unitPrice: price / quantity };
      })
      .filter((item): item is Required<typeof item> => item.unitPrice !== null);

    const allUnitPrices = items.map((item, index) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity);
      const label = `สินค้า ${String.fromCharCode(65 + index)}`;
      if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
        return { label, unitPriceText: 'N/A' };
      }
      return { label, unitPriceText: `${(price / quantity).toFixed(2)} บาท/หน่วย` };
    });

    if (itemsWithUnitPrices.length < 2) {
      return { winners: [], allUnitPrices, message: 'กรอกข้อมูลอย่างน้อยสองรายการให้ครบถ้วน' };
    }

    const minUnitPrice = Math.min(...itemsWithUnitPrices.map(item => item.unitPrice));
    const winners = itemsWithUnitPrices.filter(item => item.unitPrice === minUnitPrice);

    let message = '';
    if (winners.length === itemsWithUnitPrices.length && winners.length > 1) {
      message = 'ราคาทุกรายการเท่ากัน';
    } else if (winners.length > 1) {
      const winnerLabels = winners.map(w => `สินค้า ${String.fromCharCode(65 + w.index)}`).join(' และ ');
      message = `${winnerLabels} คุ้มค่าที่สุด (ราคาเท่ากัน)`;
    } else {
      const winner = winners[0];
      const winnerLabel = `สินค้า ${String.fromCharCode(65 + winner.index)}`;
      
      const otherPrices = itemsWithUnitPrices
        .filter(item => item.unitPrice > minUnitPrice)
        .map(item => item.unitPrice);

      if (otherPrices.length > 0) {
        const nextBestPrice = Math.min(...otherPrices);
        const percentageDifference = ((nextBestPrice - minUnitPrice) / minUnitPrice) * 100;
        message = `${winnerLabel} คุ้มค่าที่สุด (ถูกกว่าอย่างน้อย ${percentageDifference.toFixed(1)}%)`;
      } else {
        message = `${winnerLabel} คุ้มค่าที่สุด`;
      }
    }

    return { winners, allUnitPrices, message };
  }, [items]);

  const handleItemChange = (id: number, field: 'price' | 'quantity', value: string) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const handleAddItem = () => {
    setItems(prevItems => [...prevItems, { id: nextId.current++, price: '', quantity: '' }]);
  };

  const handleRemoveItem = (idToRemove: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  const handleClear = () => {
    setItems([
      { id: 1, price: '', quantity: '' },
      { id: 2, price: '', quantity: '' },
    ]);
    nextId.current = 3;
  };
  
  const getBorderColor = (item: ItemState) => {
    if (calculation.winners.length === 0) return 'border-slate-600';
    if (calculation.winners.length > 1 && calculation.winners[0].unitPrice === calculation.winners[1].unitPrice) {
        if (calculation.winners.some(w => w.id === item.id)) return 'border-blue-500';
    }
    return calculation.winners.some(w => w.id === item.id) ? 'border-green-500' : 'border-slate-600';
  };

  const ItemInput: React.FC<{
    item: ItemState;
    index: number;
    onItemChange: (id: number, field: 'price' | 'quantity', value: string) => void;
    onRemove?: (id: number) => void;
    borderColor: string;
  }> = ({ item, index, onItemChange, onRemove, borderColor }) => (
    <div className={`relative bg-slate-700/50 p-4 rounded-lg border-2 ${borderColor} transition-colors duration-300`}>
      {onRemove && (
        <button 
          onClick={() => onRemove(item.id)} 
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-600 transition-colors"
          aria-label="Remove item"
        >
          <TrashIcon />
        </button>
      )}
      <h3 className="text-lg font-semibold text-white mb-3">{`สินค้า ${String.fromCharCode(65 + index)}`}</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-slate-400">ราคา (บาท)</label>
          <input
            type="number"
            min="0"
            value={item.price}
            onChange={(e) => onItemChange(item.id, 'price', e.target.value)}
            placeholder="เช่น 100"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">ปริมาณ (หน่วย/กรัม/มล.)</label>
          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={(e) => onItemChange(item.id, 'quantity', e.target.value)}
            placeholder="เช่น 500"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cyan-400">Price Comparison</h2>
        <p className="mt-2 text-slate-400 max-w-md mx-auto">
          เปรียบเทียบราคาต่อหน่วยของสินค้าแต่ละชิ้น อันไหนคุ้มกว่า?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <ItemInput 
            key={item.id}
            item={item}
            index={index}
            onItemChange={handleItemChange}
            onRemove={items.length > 2 ? handleRemoveItem : undefined}
            borderColor={getBorderColor(item)} 
          />
        ))}
      </div>

       <button
          onClick={handleAddItem}
          className="w-full bg-slate-700 text-cyan-400 font-bold py-3 px-4 rounded-lg hover:bg-slate-600 border-2 border-dashed border-slate-600 hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
        >
          <PlusIcon />
          <span>เพิ่มรายการ</span>
        </button>

      <div className="bg-slate-700 p-4 rounded-lg min-h-[100px] flex flex-col justify-center items-center text-center">
        {calculation.winners.length > 0 ? (
          <div className="animate-fade-in-up w-full">
            <p className={`text-xl font-bold ${
              calculation.winners.length > 1 ? 'text-blue-400' : 'text-green-400'
            }`}>
              {calculation.message}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full mt-3 text-sm text-slate-300">
              {calculation.allUnitPrices.map(item => (
                <span key={item.label} className="truncate">{item.label}: {item.unitPriceText}</span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-400">{calculation.message}</p>
        )}
      </div>

      <button
        onClick={handleClear}
        className="w-full sm:w-1/2 mx-auto bg-slate-600 text-slate-200 font-bold py-3 px-4 rounded-lg hover:bg-slate-500 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default PriceComparisonCalculator;