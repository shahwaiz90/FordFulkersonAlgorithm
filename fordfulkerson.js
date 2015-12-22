//Ahmad Shahwaiz
//L135062
 
var TotalVertix; 
var pathMaker = " ";

function fordFulkerson(graph, start, destination){
	var u, v; 
	var residualGraph = new Array(TotalVertix);
	 TotalVertix = graph.length;
	//Copying Graph into Residual Graph
	for (u = 0; u < TotalVertix; u++){
		residualGraph[u] = new Array(TotalVertix);

		for (v = 0; v < TotalVertix; v++){
				residualGraph[u][v] = graph[u][v];
				//document.getElementById("Demo").innerHTML() += 'asdasd';
				console.log(residualGraph[u][v] = graph[u][v]);
			}
		}
 
	var trackParent = new Array(TotalVertix);
	var max_flow = 0;
	
	//Augmented Path from Start to Destination

	while (BreadthFirstSearch(residualGraph, start, destination, trackParent)){
		
	
		var path_flow = Number.MAX_SAFE_INTEGER;
		var followed_path='';
		
		for (v = destination; v != start; v = trackParent[v]){

			followed_path ='====>'+v+followed_path;
		 	u	 = trackParent[v]; 
			
			 path_flow = Math.min(path_flow, residualGraph[u][v]);
				//console.log(v);
 		 		//console.log(path_flow);
			
		}
		printResidualGraph(residualGraph);
		followed_path =start+followed_path+'';
		document.getElementById("Path").innerHTML+='<div align="center"><b>Path: </b> '+followed_path+'<br></div>';
		document.getElementById("Path").innerHTML+='<div align="center"><b>Added flow:</b>'+path_flow+'<br></div>';
		

		for (v = destination; v != start; v = trackParent[v]){
			u = trackParent[v];
			if(graph[u][v] > 0){
				residualGraph[u][v] -= path_flow;
				residualGraph[v][u] += path_flow;
			}else{
				residualGraph[u][v] -= path_flow; 
			} 
		}
 
		max_flow += path_flow;
	}
		return max_flow;
}

function BreadthFirstSearch(Graph, start, destination, trackParent){

	var visited = new Array();

	for(var i = 0; i < TotalVertix; i++){  
		// Flag all vertices as 0 or unvisited
		visited[i] = 0;
	}	
		//Add First Entry in Queue to find path from root
		var queue = new Queue();
		queue.enqueue(start);
		
		//Mark the visited nodes and track parent
		visited[start] = 1;
		trackParent[start] = -1;

		//BFS Loop
		while(queue.getLength() != 0){

			var u = queue.dequeue();
			for(var v = 0; v < TotalVertix; v++){

				if(visited[v] == 0 && Graph[u][v] > 0){
					queue.enqueue(v);
					trackParent[v] = u;
					visited[v] = 1;
				} 
			} 
		} 
	
	return visited[destination] == 1; 
}


function printResidualGraph(graph){
	var table='<br><br><b>Residual Graph</b><table width="30%" align="center" cellspacing=10 cellpadding=5>';
	for (var u = 0; u < TotalVertix; u++){
		table +='<tr>';
		for (var v = 0; v < TotalVertix; v++){
				table +='<td>'+graph[u][v]+'</td>';
		}
		table +='</tr>';
	}
	document.getElementById("Path").innerHTML+=table+'<br>';

}




