// Source - https://stackoverflow.com/a
// Posted by Kip, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-31, License - CC BY-SA 4.0

/**
 *  Given a file, i.e. /css/base.css, replaces it with a string containing the
 *  file's mtime, i.e. /css/base.1221534296.css.
 *
 *  @param $file  The file to be loaded. works on all type of paths.
 */
function auto_version($file) {
  if($file[0] !== '/') {
    $file = rtrim(str_replace(DIRECTORY_SEPARATOR, '/', dirname($_SERVER['PHP_SELF'])), '/') . '/' . $file;
  }
  
  if (!file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
  return $file;
  
  $mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
  return preg_replace('{\\.([^./]+)$}', ".$mtime.\$1", $file);
}
