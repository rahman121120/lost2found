package com.lost2found.backend.controller;

import com.lost2found.backend.service.storage.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> uploadFile(
            @RequestParam("file") MultipartFile file) {

        String fileName = fileStorageService.saveFile(file);

        return Map.of(
                "fileName", fileName,
                "imageUrl", "http://localhost:8080/" + fileName
        );
    }
}