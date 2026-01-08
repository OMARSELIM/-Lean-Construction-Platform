
import React, { useState } from 'react';
import { Task, Comment } from '../types';
import { INITIAL_TASKS } from '../constants';
import CollaborationStatus from './CollaborationStatus';

const TaskPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS as Task[]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const addComment = (taskId: string) => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'أنا',
      text: commentText,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };
    
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, comments: [...(t.comments || []), newComment] };
      }
      return t;
    }));
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">خطة العمل الأسبوعية (WWP)</h3>
            <div className="mt-2"><CollaborationStatus /></div>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            {showAdd ? 'إلغاء' : 'إضافة مهمة +'}
          </button>
        </div>

        {showAdd && (
          <div className="p-6 bg-blue-50 border-b border-blue-100 flex gap-4">
            <input 
              type="text" 
              placeholder="ما هي المهمة التي تلتزم بها؟"
              className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">تأكيد الالتزام</button>
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {tasks.map(task => (
            <div key={task.id} className="flex flex-col">
              <div className={`p-6 flex items-center justify-between transition-colors ${task.status === 'completed' ? 'bg-slate-50' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200'
                    }`}
                  >
                    ✓
                  </button>
                  <div onClick={() => setSelectedTaskId(selectedTaskId === task.id ? null : task.id)} className="cursor-pointer group">
                    <h4 className={`font-bold group-hover:text-blue-600 transition-colors ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </h4>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] text-slate-400">👤 {task.responsible}</span>
                      <span className="text-[10px] text-slate-400">📅 {task.dueDate}</span>
                      <span className="text-[10px] text-blue-500 font-bold">💬 {task.comments?.length || 0} تعليقات</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                </span>
              </div>

              {selectedTaskId === task.id && (
                <div className="bg-slate-50 p-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-4 mb-4">
                    {task.comments?.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600">
                          {comment.user[0]}
                        </div>
                        <div className="bg-white p-3 rounded-xl rounded-tr-none shadow-sm flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-700">{comment.user}</span>
                            <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="أضف تعليقاً أو استفساراً تعاونياً..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addComment(task.id)}
                    />
                    <button 
                      onClick={() => addComment(task.id)}
                      className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      إرسال
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPlanner;
