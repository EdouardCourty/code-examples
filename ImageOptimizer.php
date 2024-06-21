/**
 * @throws ImagickException
 */
public function optimizePicture(UploadedFile $file, int $compression = 50): string
{
    $image = new Imagick($file->getRealPath());

    $image->setImageCompressionQuality($compression);
    $image->stripImage();
    $image->setImageDepth(8);
    $image->setImageFormat(self::FORMAT_WEBP);
    $image->setOption('webp:method', '6');

    $originalWidth = $image->getImageWidth();
    $originalHeight = $image->getImageHeight();

    if ($originalWidth > $originalHeight && $originalWidth > 2000) {
        $image->scaleImage(2000, 0);
    } elseif ($originalHeight > $originalWidth && $originalHeight > 2000) {
        $image->scaleImage(0, 2000);
    }

    return $image->getImageBlob();
}
