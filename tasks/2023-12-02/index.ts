
interface QueueItem<T> {
    item: T,
    priority: number
}

export class ChristmasQueue<T> {
   private queue: QueueItem<T>[] = []

   enqueue(item: T, priority: number) {
      this.queue.push({ item, priority });
      this.queue.sort((a, b) => b.priority - a.priority );
   }

   dequeue() {
      if(this.isEmpty()) throw new Error('There are no letters in the queue!');
      
      return this.queue.shift()?.item;
   }

   isEmpty() {
    return this.queue.length === 0
   }
}