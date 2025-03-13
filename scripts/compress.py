import os
import subprocess

# Set input/output folder
input_folder = "videos"
output_folder = "compressed_videos"

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Compression settings (H.265 / HEVC)
CRF = 28  # Adjust this value (Lower = Better Quality, Higher = Smaller File)
BITRATE = "1M"  # 1M = 1Mbps bitrate, tweak as needed

# Loop through all MP4 files
for filename in os.listdir(input_folder):
    if filename.endswith(".mp4"):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, f"compressed_{filename}")

        # FFmpeg compression command
        command = [
            "ffmpeg",
            "-i", input_path,  # Input file
            "-vcodec", "libx265",  # Use H.265 codec (Google-friendly)
            "-crf", str(CRF),  # Quality factor (18-28, lower = better quality)
            "-b:v", BITRATE,  # Bitrate limit
            "-preset", "slow",  # Optimization level (use "faster" for speed)
            "-c:a", "aac", "-b:a", "128k",  # Audio compression
            output_path,
        ]

        # Run FFmpeg
        print(f"Compressing {filename}...")
        subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✅ {filename} → {output_path}")

print("🔥 All videos compressed successfully!")