<?php
/**
 * csv_get_lines 读取CSV文件中的某几行数据
 * @param $csvfile csv文件路径
 * @param $lines 读取行数
 * @param $offset 起始行数
 * @return array
 * */
function csv_get_lines($csvfile, $lines, $offset = 0) {
    if(!$fp = fopen($csvfile, 'r')) {
     return false;
    }
    $i = $j = 0;
 while (false !== ($line = fgets($fp))) {
  if($i++ < $offset) {
   continue; 
  }
  break;
 }
 $data = array();
 while(($j++ < $lines) && !feof($fp)) {
  $data[] = fgetcsv($fp);
 }
 fclose($fp);
    return $data;
}

$data = csv_get_lines('file.csv', 3);
//print_r($data);



?>

<?php
 //读取csv文件制定行数
 function get_file_line( $file_name, $line_star,  $line_end){
    $n = 0;
    $handle = fopen($file_name,"r");
    if ($handle) {
        while (!feof($handle)) {
            ++$n;
            $out = fgets($handle, 4096);
            if($line_star <= $n){
                $ling[] = $out;
            }
            if ($line_end == $n) break;
        }
        fclose($handle);
    }
    if( $line_end==$n) return $ling;
    return false;
}
$aa = get_file_line("file.csv", 1, 100 );  //从第11行到第20行
foreach ($aa as $bb){ //www.jbxue.com
    //echo $bb.'AAAAAAAA'."<br>";
}
?>

<?php 
$file = fopen('file.csv','r'); 
while ($data = fgetcsv($file)) { //每次读取CSV里面的一行内容
//print_r($data); //此为一个数组，要获得每一个数据，访问数组下标即可
$goods_list[] = $data;
 }
 
//print_r($goods_list);
 foreach ($goods_list as $arr){

    if ($arr[0]!="" and $arr[7]!="" and strlen($arr[7])==11 ){
        $d = json_decode('{}');
        $d->name = $arr[0];
        $d->phone = $arr[7];
        $aaa[] = $d;
        echo $arr[0].','.$arr[7]."<br>";
    }
} 
 //echo $goods_list[2][0];
 fclose($file);

 echo '<br><br> zzzzzzz:'.json_encode($aaa);


?>