<script>
  export let person;
  export let index;
</script>

<div class="flex justify-between items-center py-1 border-b border-yellow-800/[50%] last:border-none text-white px-2">
  <div class="flex items-center gap-2">
    <span class="font-bold text-yellow-400">{index + 1}.</span>
    <span>{person.name}</span>
  </div>
  <div class="text-yellow-300 font-semibold">
    {person.points} pts
  </div>
</div>
