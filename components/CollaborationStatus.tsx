
import React from 'react';

const CollaborationStatus: React.FC = () => {
  const users = [
    { name: 'أحمد', color: 'bg-green-500', initial: 'أ' },
    { name: 'سارة', color: 'bg-blue-500', initial: 'س' },
    { name: 'خالد', color: 'bg-orange-500', initial: 'خ' },
  ];

  return (
    <div className="flex -space-x-2 space-x-reverse items-center">
      {users.map((user, i) => (
        <div 
          key={i} 
          className={`w-8 h-8 rounded-full border-2 border-white ${user.color} flex items-center justify-center text-white text-xs font-bold shadow-sm relative group`}
          title={user.name}
        >
          {user.initial}
          <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {user.name} متصل الآن
          </span>
        </div>
      ))}
      <div className="mr-4 text-[10px] text-slate-400 font-medium">3 مهندسين يعملون الآن</div>
    </div>
  );
};

export default CollaborationStatus;
