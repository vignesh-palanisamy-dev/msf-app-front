// issue in  ncrypt-js package, so temp encrption technique is used
function getEncrypt(value) 
   {
     var result="";
     for(let i=0;i<value.length;i++)
     {
       if(i<value.length-1)
       {
           result+=value.charCodeAt(i)+10;
           result+="-";
       }
       else
       {
           result+=value.charCodeAt(i)+10;
       }
     }
     return result;
   }


function deEncrypt(value)
   {
     var result="";
     var array = value.split("-");
   
     for(let i=0;i<array.length;i++)
     {
       result+=String.fromCharCode(array[i]-10);
     }
     return result;
   } 


export { getEncrypt, deEncrypt };