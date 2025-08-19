import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit3, Trash2, Save, Clock, Coffee, UtensilsCrossed, Dumbbell, Droplet, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  category: 'meal' | 'exercise' | 'hydration' | 'rest' | 'other';
  notes?: string;
}

interface DailyRoutineEditorProps {
  routineItems: RoutineItem[];
  onSave: (items: RoutineItem[]) => void;
  title: string;
}

const DailyRoutineEditor: React.FC<DailyRoutineEditorProps> = ({ 
  routineItems, 
  onSave, 
  title 
}) => {
  const [items, setItems] = useState<RoutineItem[]>(routineItems);
  const [editingItem, setEditingItem] = useState<RoutineItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meal': return <UtensilsCrossed className="h-4 w-4 text-orange-500" />;
      case 'exercise': return <Dumbbell className="h-4 w-4 text-green-500" />;
      case 'hydration': return <Droplet className="h-4 w-4 text-blue-500" />;
      case 'rest': return <Moon className="h-4 w-4 text-indigo-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meal': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'exercise': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'hydration': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rest': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleAddItem = () => {
    setEditingItem({
      id: Date.now().toString(),
      time: '',
      activity: '',
      category: 'other',
      notes: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: RoutineItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!editingItem || !editingItem.time || !editingItem.activity) {
      toast({
        title: "Error",
        description: "Please fill in time and activity fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = editingItem.id && items.find(item => item.id === editingItem.id)
      ? items.map(item => item.id === editingItem.id ? editingItem : item)
      : [...items, editingItem];

    // Sort by time
    updatedItems.sort((a, b) => a.time.localeCompare(b.time));
    
    setItems(updatedItems);
    setIsDialogOpen(false);
    setEditingItem(null);
    
    toast({
      title: "Success",
      description: "Routine item saved successfully!",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Deleted",
      description: "Routine item removed.",
    });
  };

  const handleSaveRoutine = () => {
    onSave(items);
    toast({
      title: "✨ Routine Saved!",
      description: "Your personalized routine has been updated.",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              {title}
            </CardTitle>
            <CardDescription>Customize your daily routine for optimal health</CardDescription>
          </div>
          <Button onClick={handleAddItem} size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No routine items yet. Click "Add Item" to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.time}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  {getCategoryIcon(item.category)}
                  <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.activity}</p>
                  {item.notes && (
                    <p className="text-xs text-muted-foreground truncate">{item.notes}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {items.length > 0 && (
          <Button onClick={handleSaveRoutine} className="w-full bg-gradient-to-r from-green-500 to-blue-600">
            <Save className="h-4 w-4 mr-2" />
            Save Routine
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingItem?.id && items.find(item => item.id === editingItem.id) ? 'Edit' : 'Add'} Routine Item
              </DialogTitle>
              <DialogDescription>
                Create a new activity for your daily routine.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={editingItem?.time || ''}
                  onChange={(e) => setEditingItem(prev => prev ? {...prev, time: e.target.value} : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="activity" className="text-right">Activity</Label>
                <Input
                  id="activity"
                  placeholder="e.g., Breakfast: Oatmeal with fruits"
                  value={editingItem?.activity || ''}
                  onChange={(e) => setEditingItem(prev => prev ? {...prev, activity: e.target.value} : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <select
                  id="category"
                  value={editingItem?.category || 'other'}
                  onChange={(e) => setEditingItem(prev => prev ? {...prev, category: e.target.value as any} : null)}
                  className="col-span-3 h-9 px-3 py-1 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="meal">Meal</option>
                  <option value="exercise">Exercise</option>
                  <option value="hydration">Hydration</option>
                  <option value="rest">Rest</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right mt-2">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Optional notes or details..."
                  value={editingItem?.notes || ''}
                  onChange={(e) => setEditingItem(prev => prev ? {...prev, notes: e.target.value} : null)}
                  className="col-span-3"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveItem}>Save Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DailyRoutineEditor;