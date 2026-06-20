package vastra_backend.requestDTO;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class AddProductRequest {

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotNull(message = "Original price is required")
    @Positive(message = "Original price must be greater than 0")
    private Double originalPrice;

    @NotNull(message = "Current price is required")
    @Positive(message = "Current price must be greater than 0")
    private Double currentPrice;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @PositiveOrZero(message = "Return period connot be negative")
    private int returnPeriod;

    @NotNull(message = "Variants are required")
    private List<AddProductVariantRequest> variants;

}
