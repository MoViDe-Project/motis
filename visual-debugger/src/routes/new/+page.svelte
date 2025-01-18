<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    import { Label } from "$lib/components/ui/label/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    

    const routes = [
        {from: "Bamberg", to: "Berlin"},
        {from: "Bamberg", to: "München"},
        {from: "Bamberg", to: "Hamburg"},
        {from: "Bamberg", to: "Frankfurt"},
        {from: "Bamberg", to: "Köln"},
        {from: "Bamberg", to: "Stuttgart"},
        {from: "Bamberg", to: "Düsseldorf"},
        {from: "Bamberg", to: "Dresden"},
        {from: "Bamberg", to: "Leipzig"},
        {from: "Bamberg", to: "Hannover"},
        {from: "Bamberg", to: "Nürnberg"},
        {from: "Bamberg", to: "Dortmund"},
        {from: "Bamberg", to: "Essen"},
        {from: "Bamberg", to: "Bremen"},
        {from: "Bamberg", to: "Duisburg"},
        {from: "Bamberg", to: "Bochum"},
        {from: "Bamberg", to: "Wuppertal"},
        {from: "Bamberg", to: "Bielefeld"},
        {from: "Bamberg", to: "Bonn"},
        {from: "Bamberg", to: "Münster"},
        {from: "Bamberg", to: "Berlin"},
        {from: "Bamberg", to: "München"},
        {from: "Bamberg", to: "Hamburg"},
        {from: "Bamberg", to: "Frankfurt"},
        {from: "Bamberg", to: "Köln"},
        {from: "Bamberg", to: "Stuttgart"},
        {from: "Bamberg", to: "Düsseldorf"},
        {from: "Bamberg", to: "Dresden"},
        {from: "Bamberg", to: "Leipzig"},
        {from: "Bamberg", to: "Hannover"},
        {from: "Bamberg", to: "Nürnberg"},
        {from: "Bamberg", to: "Dortmund"},
        {from: "Bamberg", to: "Essen"},
        {from: "Bamberg", to: "Bremen"},
        {from: "Bamberg", to: "Duisburg"},
        {from: "Bamberg", to: "Bochum"},
        {from: "Bamberg", to: "Wuppertal"},
        {from: "Bamberg", to: "Bielefeld"},
        {from: "Bamberg", to: "Bonn"},
        {from: "Bamberg", to: "Münster"},
    ]
    

</script>
<!-- Container and flex logic from https://tailwindcss.com/docs/container -->
<div class="h-screen w-screen my-4 flex flex-col">
  <div class="basis-1/12 flex flex-row gap-2">
    
    <!-- Logo & Dark Mode -->
    <div class="basis-1/4 content-center justify-center">
      
      <h1 class="text-3xl text-center">MoViDe-Header</h1>
      <div class="flex justify-center space-x-2 m-2">
        <Switch id="airplane-mode" />
        <Label for="airplane-mode">Dark Mode</Label>
      </div>
    </div>

    <!-- File handling -->
    <div class="basis-3/4 text-right content-center">
      <Button variant="default">Upload now!</Button>
    </div>

  </div>

  <!-- Main content -->
  <div class="basis-10/12 h-96 w-full my-4 flex flex-row gap-2 flex">
    
    <!-- Query Batches: Grid layout scheint die einzige Option zu sein shadcn scroll box zu kontrollieren -->
    <div class="basis-1/3 grid grid-rows-12 rounded-md">
      
      <div class="p-2 row-span-1 content-end"> 
        <h1 class="text-xl">Query Batches</h1>
      </div>
      
      <div class="px-2 row-span-11">
        <ScrollArea class="rounded-md border h-full">
          <div class="p-4">
            {#each routes as route}
              <div>
                <Button variant="link">{route.from} - {route.to}</Button>
              </div>
              <Separator class="my-1"/>
            {/each}
          </div>
        </ScrollArea>            
      </div>   
     
    </div>
    
    <!-- Comparisons -->
    <div class="basis-2/3 grid grid-rows-2 grid-cols-2 gap-2">
      
      <!-- Itinerary Comparison -->
      <div class="grid grid-rows-6 rounded-md">
        <div class="p-2 row-span-1 content-end text-center"> 
          <h1 class="text-xl">Itinerary overview</h1>
        </div>
        
        <div class="p-2 row-span-5">
          <ScrollArea class="rounded-md border h-full">
            <div class="p-4 border">
              {#each routes as route}
                <div class="text-2xl">
                  <Button variant="outline" class="w-full my-2 border-green-500 bg-green-200">
                    <span class="text-left w-full">{route.from} - {route.to}</span>
                  </Button>
                </div>
                
              {/each}
            </div>
          </ScrollArea>            
        </div>   
       
      </div>
      
      <div class="grid grid-rows-6 rounded-md">
        <div class="p-2 row-span-1 content-end text-center"> 
          <h1 class="text-xl">Itinerary overview</h1>
        </div>
        
        <div class="p-2 row-span-5">
          <ScrollArea class="rounded-md border h-full">
            <div class="p-4 border">
              {#each routes as route}
                <div class="text-2xl">
                  <Button variant="outline" class="w-full my-2 border-red-500 bg-red-200">
                    <span class="text-left w-full">{route.from} - {route.to}</span>
                  </Button>
                </div>
                
              {/each}
            </div>
          </ScrollArea>            
        </div>   
       
      </div>
      

      <!-- Stops Comparison -->
      <div class="grid grid-rows-6 rounded-md">
        <div class="p-2 row-span-1 content-end text-center"> 
          <h1 class="text-xl">Itinerary overview</h1>
        </div>
        
        <div class="p-2 row-span-5">
          <ScrollArea class="rounded-md border h-full">
            <div class="p-4 border">
              {#each routes as route}
                <div class="text-2xl">
                  <Button variant="outline" class="w-full my-2 border-red-500 bg-red-200">
                    <span class="text-left w-full">{route.from} - {route.to}</span>
                  </Button>
                </div>
                
              {/each}
            </div>
          </ScrollArea>            
        </div>   
       
      </div>
      
      <div class="grid grid-rows-6 rounded-md">
        <div class="p-2 row-span-1 content-end text-center"> 
          <h1 class="text-xl">Itinerary overview</h1>
        </div>
        
        <div class="p-2 row-span-5">
          <ScrollArea class="rounded-md border h-full">
            <div class="p-4 border">
              {#each routes as route}
                <div class="text-2xl">
                  <Button variant="outline" class="w-full my-2 border-green-500 bg-green-200">
                    <span class="text-left w-full">{route.from} - {route.to}</span>
                  </Button>
                </div>
                
              {/each}
            </div>
          </ScrollArea>            
        </div>   
       
      </div>


    </div>
  
  </div>
  <div class="basis-1/12 text-center content-center">
    <h1 class="text-3xl">Footer</h1>
  </div>
      
</div>
